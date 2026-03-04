import "./globals.css";

export default function RootLayout({
  children,
}: {
    children: React.ReactNode;
}) {
  return (
    <html>
        <body className="min-h-screen bg-slate-100 text-slate-900">
            <header className="header flex flex-row items-center justify-between p-4 bg-white shadow-md border-b">
                <h1 className="text-xl font-bold text-indigo-600">Event Hub</h1>
            </header>
            <div className="flex flex-col md:flex-row">
                <div className="flex-1 w-full md:w-7/8 p-4">
                    {children}
                </div>
            </div>
        </body>
    </html>
    )
}