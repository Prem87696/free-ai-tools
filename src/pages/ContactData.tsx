import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export function ContactData() {

const [data, setData] = useState([]);

async function fetchData() {
const { data, error } = await supabase
.from("contacts")
.select("*")
.order("id", { ascending: false });

 
if (!error) {
  setData(data);
}
 

}

useEffect(() => {
fetchData();
}, []);

return ( <div className="max-w-3xl mx-auto p-4">


  <h1 className="text-2xl font-bold mb-4">Messages</h1>

  {data.length === 0 && <p>No messages yet</p>}

  {data.map((item) => (
    <div key={item.id} className="border p-4 mb-3 rounded-lg">

      <p><b>Name:</b> {item.name}</p>
      <p><b>Email:</b> {item.email}</p>
      <p><b>Message:</b> {item.message}</p>

    </div>
  ))}

</div>

);
}
