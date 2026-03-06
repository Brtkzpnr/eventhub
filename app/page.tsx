import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {

  const events = await prisma.event.findMany({
     include: {
          Category: true
      }
  });

  return (
      <main className="container mx-auto py-10 px-4 md:px-8">
    <h1 className="text-3xl font-bold mb-8">Etkinlikler</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {events.map((event) => (
      <Link href={`/events/${event.id}`} key={event.id} className="block">
        <Card key={event.id} className="flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-transform overflow-hidden">
          <CardHeader className="">
            <div className="relative w-full h-48 rounded-t-lg overflow-hidden aspect-4/3"> 
              <Image 
                src={event.imageUrl || "/kapak.png"} 
                alt={event.title}
                fill
                className="object-cover object-center transition-transform hover:scale-105"
              />
            </div>
            <div className="flex flex-col mb-2">
              { <Badge className="text-sm bg-purple-200 text-purple-700 mb-2">{event.Category.name}</Badge>}    
              <CardTitle className="text-xl">{event.title}</CardTitle>

            </div>
            <CardDescription>
              {new Date(event.date).toLocaleDateString('tr-TR')} • {event.location}
            </CardDescription>
          </CardHeader>
          
          <CardFooter className="flex justify-between items-center mt-auto pt-4">
            <span className="text-lg font-bold">{event.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            <Button className="cursor-pointer bg-purple-500 hover:bg-purple-700">Bilet Al</Button>
          </CardFooter>
        </Card>
      </Link>
      ))}
    </div>
  </main>
  );
}
