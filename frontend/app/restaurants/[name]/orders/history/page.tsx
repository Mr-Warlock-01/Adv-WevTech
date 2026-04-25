import Footer from "@/component/restaurants/footer";
import Header from "@/component/restaurants/header";
import Sidebar from "@/component/restaurants/sidebar";


export default async function HistoryOrders({params}: {params: { name: string }}){
  const { name } = await params;
  const displayName = decodeURIComponent(name);
    return (
    <>
      <Header name={displayName} />
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        
        
        <div className="flex flex-1">
          <aside className="w-64 hidden md:block bg-white border-r border-slate-200">
            <Sidebar name={displayName} />
          </aside>
          
          <main className="flex-1 p-8 md:p-12 overflow-y-auto">
              <h1>History Orders</h1>
          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
}