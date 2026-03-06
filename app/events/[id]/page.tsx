import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import TicketBar from "@/components/ticketbar";
import { ArrowBigLeft } from "lucide-react";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { 
     id: parseInt(id, 10)
    },
    include: {
      Category: true
    }
  });
  
  
if (!event) {
  return <div>Etkinlik bulunamadı.</div>;
}
return (
  <div>
    <div className="mb-6">
      <a href="/.." className="flex items-center text-md text-gray-600 hover:text-purple-500 transition-colors">
        <ArrowBigLeft className="mr-1" />
       Etkinliklere Geri Dön
      </a>
    </div>
    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
      <Card className="w-full md:w-3/5 lg:w-2/3 gap-6 p-6">
        <p className="text-sm text-slate-700 mb-2">
            {new Date(event.date).toLocaleDateString('tr-TR')} • {event.location}
        </p>
        <Badge className="text-sm bg-purple-200 text-purple-700 mb-2">
            {event.Category ? event.Category.name : "Kategori Yok"}
        </Badge>
        <div className=" relative w-5/6 aspect-video rounded-2xl overflow-hidden shadow-md"> 
          <Image 
            src={event.imageUrl || "/kapak.png"} 
            alt={event.title}
            fill 
            className="object-cover object-center"
          />
        </div>
        <div className="border-t-2 mt-2 gap-4 flex flex-col">
          <h1 className="text-3xl font-bold mt-4 ">{event.title}</h1>
          <p className="text-md text-slate-800">{event.description || "Açıklama Yok."}</p>
          <p className="text-end text-xl font-bold">{event.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</p>
        </div>
      </Card>
      <div className="w-full md:w-2/5 lg:w-1/3">
        <TicketBar event={event} />
      </div>
    </div>
  </div>
);
}