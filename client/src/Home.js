export const Home = () => {
    return (
        <div>
            <h1>Generate a quote for your project</h1>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
                
                <div class="py-8 px-6 shadow rounded-lg sm:px-10">
                    <form class="mb-0 space-y-6">
                        <div>
                            <h2>Project Details</h2>
                            <div>
                                <label class="block text-sm">Project Name</label>
                                <div class="mt-1">
                                    <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm">Project Description</label>
                                <div class="mt-1">
                                    <textarea class="w-full border text-xs border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Employees</h2>
                            <div class="flex space-x-5">
                                <div>
                                    <label class="block text-sm">Project Name</label>
                                        <div class="mt-1">
                                            <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                        </div>
                                </div>
                                <div>
                                    <label class="block text-sm">Type</label>
                                        <div class="mt-1">
                                            <select class="text-s w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400">
                                                <option>Junior</option>
                                                <option>Standard</option>
                                                <option>Senior</option>
                                            </select>
                                        </div>  
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <h2>Extras</h2>
                            <div class="flex space-x-5">
                                <div>
                                    <label class="block text-sm">Item Name</label>
                                        <div class="mt-1">
                                            <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                        </div>
                                </div>
                                <div>
                                    <label class="block text-sm">Price (£)</label>
                                    <div class="mt-1">
                                        <input type="number" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 justify-center">
                            <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Get Quote</button>
                        </div>
                    </form>
                </div>
            </div>
    </div>
    
    
    )
}