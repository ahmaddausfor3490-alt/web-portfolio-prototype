export interface Project {
  id: number;
  title: string;
  description: {
    en: string;
    id: string;
  };
  tech: string[];
  link: string;
  github: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Image & Word to PDF Converter",
    description: {
      en: "A web application to convert images (JPG/PNG/WebP) and Word documents (.docx) into PDF. Image conversion runs entirely in the browser using jsPDF, while DOCX conversion is handled server-side with LibreOffice Headless.",
      id: "Aplikasi web untuk mengonversi gambar (JPG/PNG/WebP) dan dokumen Word (.docx) menjadi PDF. Konversi gambar berjalan di browser menggunakan jsPDF, sementara konversi DOCX ditangani di server dengan LibreOffice Headless.",
    },
    tech: ["Node.js", "Express", "JavaScript", "jsPDF", "LibreOffice", "Docker", "Railway"],
    link: "https://kirdun-pdfconverter-production.up.railway.app/",
    github: "https://github.com/ahmaddausfor3490-alt/image_to_pdf_converter.git",
  },
  {
    id: 2,
    title: "SiPakar — Sistem Pakar Pemilihan Jurusan Kuliah",
    description: {
      en: "A Java-based expert system that helps high school students identify the most suitable college major through structured questionnaires and a forward chaining inference mechanism. The system evaluates user responses using weighted scoring and provides ranked study program recommendations.",
      id: "Aplikasi sistem pakar berbasis Java yang membantu siswa SMA/SMK menentukan jurusan kuliah yang paling sesuai melalui kuesioner terstruktur dan metode forward chaining. Sistem menghitung tingkat kecocokan berdasarkan pembobotan dan menampilkan rekomendasi jurusan secara terurut.",
    },
    tech: ["Java", "Java Swing", "MySQL", "JDBC", "MVC"],
    link: "#",
    github: "https://github.com/ahmaddausfor3490-alt/SiPakar",
  },
  {
    id: 3,
    title: "Personal Portfolio Website",
    description: {
      en: "A modern, responsive personal portfolio website built with Next.js and Framer Motion. Features smooth scroll animations, dark/light theme toggle, bilingual support (EN/ID), and a clean minimalist design to showcase projects and skills.",
      id: "Website portfolio pribadi yang modern dan responsif, dibangun dengan Next.js dan Framer Motion. Dilengkapi animasi scroll yang halus, toggle tema gelap/terang, dukungan multibahasa (EN/ID), dan desain minimalis yang bersih untuk memamerkan proyek serta keahlian.",
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: {
      en: "An interactive analytics dashboard with real-time data visualization, custom reports, and automated insights for business intelligence.",
      id: "Dashboard analitik interaktif dengan visualisasi data real-time, laporan kustom, dan insight otomatis untuk inteligensi bisnis.",
    },
    tech: ["Next.js", "D3.js", "Python", "FastAPI", "Tailwind CSS"],
    link: "#",
    github: "#",
  },
];
