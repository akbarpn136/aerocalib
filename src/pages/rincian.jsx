import { useParams } from "@solidjs/router";

export default function HalamanRincian() {
  const params = useParams();

  return <div>Halaman rincian kegiatan {params.id}</div>;
}
