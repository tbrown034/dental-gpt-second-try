export default function MailAPI() {
  return (
    <section className="flex flex-col min-h-screen gap-4 p-6 bg-gradient-to-r from-teal-800 to-sky-800">
      <h1 className="text-4xl font-bold text-white">Contact Me</h1>
      <form className="flex flex-col gap-4 rounded-lg">
        <input className="p-4 rounded-xl" placeholder="name"></input>
        <input className="p-4 rounded-xl" placeholder="email"></input>
        <textarea
          rows={4}
          className="p-4 rounded-xl"
          placeholder="message"
        ></textarea>
        <button className="p-2 transition-all duration-200 ease-in-out bg-teal-700 rounded-lg shadow-lg text-teal-50 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200">
          Send
        </button>
      </form>
    </section>
  );
}
