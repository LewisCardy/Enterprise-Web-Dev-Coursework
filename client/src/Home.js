export const Home = () => {
    return (
        <div>
            
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
            <h1 class="text-2xl mb-5">Generate a quote for your project</h1>
                <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                    <form class="mb-0 space-y-6">
                        <div>
                            <h2>Project Details</h2>
                            <div>
                                <label class="block text-sm text-gray-600">Project Name</label>
                                <div class="mt-1">
                                    <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600">Project Description</label>
                                <div class="mt-1">
                                    <textarea class="w-full border text-xs border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Employees</h2>
                            <div class="flex space-x-5">
                                <div>
                                    <label class="block text-sm text-gray-600">Project Name</label>
                                        <div class="mt-1">
                                            <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                        </div>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-600">Type</label>
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
                                    <label class="block text-sm text-gray-600">Item Name</label>
                                        <div class="mt-1">
                                            <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                        </div>
                                </div>
                                <div>
                                    <label class="block text-sm text-gray-600">Price (£)</label>
                                    <div class="mt-1">
                                        <input type="number" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 justify-center">
                            <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Get Quote</button>
                        </div>
                        <div class="grid grid-cols-2 items-center justify-center">
                            <h3 class="">Your Final Quote Is...</h3>
                            <h1 class=" text-4xl underline text-orange-400">£125000</h1>
                        </div>
                        <div class="flex justify-end m-0">
                            <button class="bg-orange-400 rounded-2xl shadow-lg m-0 p-2 hover:bg-orange-500 hover:font-semibol">Save Quote</button>
                        </div>
                    </form>
                </div>
            </div>

    </div>
    
    
    )
}