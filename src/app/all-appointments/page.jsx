{/* PROFILE UPDATE MODAL */}

{profileModal && (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

        <div className="bg-white p-6 rounded-2xl w-full max-w-md">

            <h2 className="text-2xl font-bold mb-5">
                Update Profile
            </h2>

            <form
                onSubmit={handleProfileUpdate}
                className="space-y-4"
            >

                <input
                    name="name"
                    defaultValue={user?.name}
                    placeholder="Name"
                    className="w-full border p-3 rounded-xl"
                    required
                />

                <input
                    name="image"
                    defaultValue={user?.image}
                    placeholder="Photo URL"
                    className="w-full border p-3 rounded-xl"
                    required
                />

                <input
                    value={user?.email}
                    readOnly
                    className="w-full border p-3 rounded-xl bg-gray-100"
                />

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl"
                    >
                        Save Changes
                    </button>

                    <button
                        type="button"
                        onClick={() => setProfileModal(false)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    </div>

)}