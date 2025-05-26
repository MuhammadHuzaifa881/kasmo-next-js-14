'use client';
import Button from '@mui/material/Button';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="w-full flex flex-col items-center gap-3 text-center py-10 px-5">
        <div className="bg-white/60 p-7 rounded-md flex flex-col gap-3 items-center">
          <h2 className="text-2xl">Something went wrong!</h2>
          <p>{error?.message}</p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
