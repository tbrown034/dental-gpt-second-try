export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 px-2 text-white bg-cyan-700">
      <h1 className="text-4xl font-bold">Dental GPT</h1>
      <p className=" md:w-96 w-72 lg:w-max">
        Dental GPT is an Open AI-powered chatbox that is designed to give you
        quick answers to any of you dental needs.
      </p>

      <form className="flex flex-col gap-2 p-4 border-4 border-cyan-500">
        <div className="flex flex-col items-center gap-2">
          <label>Your Question:</label>
          <textarea
            resize
            rows={4}
            placeholder="Your question here ..."
            className="px-2 text-black resize-none md:w-96 w-72 bg-lime-50"
          ></textarea>
        </div>
        <button className="text-sm bg-cyan-600 hover:bg-cyan-500">
          Send Question
        </button>
      </form>
    </main>
  );
}
