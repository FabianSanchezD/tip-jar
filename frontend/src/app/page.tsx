import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans font-bold flex flex-col items-center justify-items-center min-h-screen p-8 py-20 gap-5">
        <h1 className="text-4xl">Tip Jar (Testnet)</h1>
        <h2 className="text-2xl">Send a tip to: <span className="text-3xl text-blue-500">{process.env.NEXT_PUBLIC_RECEIVER_NAME}</span></h2>
        <h2 className="text-l">Receiver address: <span className="text-l text-blue-400">{process.env.NEXT_PUBLIC_RECEIVER_PK}</span></h2>
        <form action="" className="flex flex-col gap-3 pt-3">
            <input type="text" placeholder="Enter your tip amount in XLMs" className="border border-gray-300 p-2 rounded" />
            <input type="text" placeholder="Enter your message (memo)" className="border border-gray-300 p-2 rounded" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Tip with Freighter</button>
        </form>
    </div>
  );
}
