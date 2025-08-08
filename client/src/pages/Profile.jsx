
export default function Profile() {

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="mt-1 text-lg text-gray-900">
              {/* {user?.name || 'Not provided'} */}
               vianyak</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-lg text-gray-900">
              {/* {user?.email} */}
              </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
            <p className="mt-1 text-lg text-gray-900">
              {/* {new Date(user?.createdAt).toLocaleDateString()} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}