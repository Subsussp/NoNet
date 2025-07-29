import { Search } from 'lucide-react';
import Aitem from 'pages/control/Aitem';
import  Panel  from "pages/Admin Header (Not a route)/Panel";
import { useContext, useEffect, useState } from 'react';
import { Shopcontext } from "pages/Root/Shop/Shop";

let Products = ({refetch,data})=>{
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All'); // Store raw data, not JSX
    const categories = ['All', ...new Set(data ? data.map(item => item.catg) : [])];
    const [search, setSearch] = useState(''); // Store raw data, not 
    const [showForm, setShowForm] = useState([false, '','']);
    function toggleForm() {
      setShowForm(!showForm);
    }
     async function refresh() {
        await refetch(); // Ensure the latest data is fetched
    }
    useEffect(() => {
        setItems(data)
    },[data])
    useEffect(() => {
      if(data){
        let filters = data.filter((item)=>(item.name.toLowerCase().replaceAll(' ','')).includes(search.toLowerCase().replaceAll(' ','')))
        setItems(filters);
      }
    },[search])
    if(!data){
      return
    }
    return <section>
    <div className="panel">
    <button className='button' onClick={() => setShowForm([true, 'Add'])}>Add Item</button>
    </div>
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
<h2 className="text-3xl p-2 font-Main font-semibold
text-black">Inventory Items</h2>
<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
    <Panel showForm={showForm} onClose={toggleForm} resfresh={refresh}/>
    
  {/* Search Bar */}
  <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search items..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 border border-black font-Main placeholder:text-black focus:outline-none "
    />
  </div>
  
  {/* Category Filter */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="px-4 py-2 border bg-white border-gray-200 focus:outline-none focus:border-black"
  >
    {categories.map(category => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{(items && items.length > 0) && (<>
                    {selectedCategory == 'All' ? items.map((item) =><Aitem
                            key={item._id}
                            onClose={toggleForm}
                            showForm={showForm}
                            setShowForm={setShowForm}
                            item={item}
                            refresh={refresh}
                        />)
                    : items.map((item) => ((item.catg == selectedCategory) ?
                    <Aitem
                        key={item._id}
                        onClose={toggleForm}
                        showForm={showForm}
                        setShowForm={setShowForm}
                        item={item}
                        refresh={refresh}
                    /> : <></>))}
                </>
            )}

</div>
</section>

}

export default Products