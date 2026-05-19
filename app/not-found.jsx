
import "./globals.css";


export default function NotFound() {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-content-heading">
        <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
     
          <div className="relative z-10 text-center space-y-8 max-w-lg">
            <p className="text-[8rem] font-bold leading-none select-none text-content-muted/40">
              404
            </p>

            <div className="space-y-3">
              <h1 className="text-heading font-bold text-content-heading mb-6">
                Page Not Found
              </h1>
              <p className="text-subheading text-content-body">
                Seems like you&apos;ve gotten yourself lost.
              </p>
              <p className="text-subheading text-content-body">
               I Hope you find your way back safely.
              </p>
            </div>

       
          </div>
        </div>
      </body>
    </html>
  );
}
