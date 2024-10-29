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

            sidecar_command.spawn().expect("Failed to spawn surreal");

            Ok(())
        })
        .on_window_event(move |window, event| match event {
            tauri::WindowEvent::Destroyed => {
                println!("STOP");

                window.close().unwrap();
            }
            _ => {}
        })
        .plugin(tauri_plugin_shell::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
