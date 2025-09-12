import Button from "@mui/material/Button";

export default function Home() {
  return (
    <div className="p-10 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Hello Tailwind + MUI</h1>
      <Button variant="contained" className="!bg-red-500 !text-white mt-4">
        MUI Button styled with Tailwind
      </Button>
    </div>
  );
}
