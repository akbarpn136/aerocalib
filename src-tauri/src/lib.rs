use std::sync::{Arc, Mutex};
use tauri::Manager;
use tauri_plugin_shell::ShellExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let sidecar_command = app
                .shell()
                .sidecar("surreal")
                .expect("failed to create `surreal` binary command")
                .args([
                    "start",
                    "--user",
                    "root",
                    "--pass",
                    "root",
                    "file:aerocalib.db",
                ]);

            let (_rx, comm) = sidecar_command.spawn().expect("Failed to spawn surreal");
            let proc = Arc::new(Mutex::new(Some(comm)));
            let proclone = Arc::clone(&proc);
            let window = app.get_webview_window("main").unwrap();

            window.on_window_event(move |ev| match ev {
                tauri::WindowEvent::Destroyed => {
                    if let Some(proclone_lock) = proclone.lock().unwrap().take() {
                        if let Err(e) = proclone_lock.kill() {
                            eprintln!("Failed to kill child process: {}", e);
                        }
                    }
                }
                _ => {}
            });

            Ok(())
        })
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
