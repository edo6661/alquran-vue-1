export interface Alquran {
  arti: string;
  audioFull: {
    [key: string]: string;
  };
  deskripsi: string;
  jumlahAyat: number;
  nama: string;
  namaLatin: string;
  nomor: number;
  tempatTurun: string;
}

export interface Surah extends Alquran {
  audioFull: {
    [key: string]: string;
  };
  ayat: Ayat[];
  suratSelanjutnya: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
  };
  suratSebelumnya:
    | boolean
    | {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
      };
}

export interface SuratData extends Alquran {
  data: Surah;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

export interface Tafsir extends Surah {
  tafsir: {
    ayat: number;
    teks: string;
  };
}
