export type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: 1,
    title: "مساحات عمل مرنة",
    description:
      "مساحات عملية واحترافية تناسب العمل الفردي والفرق الصغيرة مع بيئة تساعدك على التركيز والنمو.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "قاعات اجتماعات",
    description:
      "قاعات مجهزة للاجتماعات والعروض واللقاءات المهنية في بيئة هادئة واحترافية.",
    image:
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "مكاتب خاصة",
    description:
      "مكاتب خاصة تمنحك الخصوصية والراحة مع تجربة عمل احترافية دون الالتزام بمكتب تقليدي.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
  }
];

export const gallery = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80"
];