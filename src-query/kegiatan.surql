OPTION IMPORT;
BEGIN TRANSACTION;

-- Create schemaless user table.
DEFINE TABLE IF NOT EXISTS kegiatan SCHEMALESS;

-- Define some fields.
DEFINE FIELD arsip ON TABLE kegiatan TYPE bool;
DEFINE FIELD dibuat ON TABLE kegiatan TYPE datetime;
DEFINE FIELD instansi ON TABLE kegiatan TYPE string;
DEFINE FIELD peralatan ON TABLE kegiatan TYPE string;
DEFINE FIELD kalibrasi ON TABLE kegiatan TYPE string;
DEFINE FIELD psatuan ON kegiatan TYPE option<string> DEFAULT 'Pa';
DEFINE FIELD vsatuan ON kegiatan TYPE option<string> DEFAULT 'm/s';

-- Define index
DEFINE INDEX unique_peralatan ON TABLE kegiatan COLUMNS peralatan UNIQUE;

-- Define index for search
DEFINE ANALYZER cari_peralatan_analyzer TOKENIZERS blank, class, camel, punct FILTERS lowercase;
DEFINE INDEX cari_peralatan ON kegiatan FIELDS peralatan SEARCH ANALYZER cari_peralatan_analyzer BM25;
DEFINE INDEX cari_instansi ON kegiatan FIELDS instansi SEARCH ANALYZER cari_peralatan_analyzer BM25;

COMMIT TRANSACTION;