import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function Home() {
    const events = await prisma.event.findMany({
       include: {
            Category: true
        }
    });

    return (
        <main className="container mx-auto py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8">Etkinlikler</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl">{event.title}</CardTitle>
                  { <Badge variant="secondary">{event.Category.name}</Badge>}               
              </div>
              <CardDescription>
                {new Date(event.date).toLocaleDateString('tr-TR')} • {event.location}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <p className="text-sm text-slate-700">
                {event.description || "Açıklama Yok."}
              </p>
            </CardContent>
            
            <CardFooter className="flex justify-between items-center mt-auto pt-4">
              <span className="text-lg font-bold">{event.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              <Button>Bilet Al</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
    );
}
