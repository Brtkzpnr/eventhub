"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Ticket, MapPinned  } from "lucide-react";
import { useState } from "react";

interface TicketBarProps {
    event: {
        id: number;
        title: string;
        date: string | Date;
        location: string;
        price: number;
    } | null;
}

const formatDateTime = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  return date.toLocaleString('tr-TR', {
    timeZone: 'Europe/Istanbul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit'
  });
};  





 

export default function TicketBar({event}: TicketBarProps) {

    const [ticketCount, setTicketCount] = useState(1);

    function handleIncrease() {
        setTicketCount(prevCount => Math.max(prevCount + 1));
    }
    function handleDecrease() {
        setTicketCount(prevCount => Math.max(prevCount - 1, 1));
    }
    const totalPrice = event ? event.price * ticketCount : 0;

    if (!event) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-xl border sticky top-24 flex justify-center items-center h-48">
        <p className="text-gray-500 font-medium">Etkinlik bilgileri yüklenemedi.</p>
      </div>
    );
  }

    return (
        <Card className="bg-white shadow-lg p-4 flex items-center justify-between z-50">
            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold"><Ticket className="inline-block mr-2" />{event.title + " Giriş Bileti "}</h2>
                <p className="text-sm text-gray-600"><CalendarDays size={16} className="inline-block mr-2 " />{formatDateTime(event.date)}</p>
                <p className="text-sm text-gray-600"><MapPinned size={16} className="inline-block mr-2" />{event.location}</p>
            </div>
            <div className="flex flex-col items-center gap-4">
                <p>Bilet Sayısı</p>
                <div className="flex items-center border rounded-md">
                    <Button size="sm" className="cursor-pointer bg-purple-500 hover:bg-purple-700" onClick={handleDecrease} disabled={ticketCount === 1}>-</Button>
                    <span className="px-4">{ticketCount}</span>
                    <Button className="cursor-pointer bg-purple-500 hover:bg-purple-700" size="sm" onClick={handleIncrease} disabled={ticketCount === 10}>+</Button>
                </div>
                <div className="text-lg font-bold">
                    {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                </div>
            </div>
            <Button className="bg-purple-500 hover:bg-purple-700">Ödemeye Geç</Button>
        </Card>
    );
}

