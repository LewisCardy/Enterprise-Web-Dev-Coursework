export const Register = () => {
    return (
        <div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-md" >
            <h1 class="text-2xl mb-5">Login</h1>
                <div class="py-2 px-6 shadow rounded-lg sm:px-10">
                    <form class="mb-0 space-y-6">
                        <div>
                            <div>
                                <label class="block text-sm text-gray-600">Name</label>
                                <div class="mt-1">
                                    <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600">Email</label>
                                <div class="mt-1">
                                    <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm text-gray-600">Password</label>
                                <div class="mt-1">
                                    <input type="text" class="w-full border border-gray-200 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400"></input>
                                </div>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 justify-center">
                            <button class="bg-orange-400 rounded-lg shadow-lg m-2 p-2 hover:bg-orange-500 hover:font-semibold">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}