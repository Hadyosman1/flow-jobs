import H1 from "@/components/ui/h1";

const NotFound = () => {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center space-y-5 px-3 py-10 text-center">
      <H1>Not Found</H1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
};

export default NotFound;
