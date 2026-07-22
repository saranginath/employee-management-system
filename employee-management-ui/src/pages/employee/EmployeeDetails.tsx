function EmployeeDetails() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Employee Details
          </h1>
          <p className="text-sm text-slate-500">
            Detailed profile and work information.
          </p>
        </div>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          Verified
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Full name</p>
          <p className="mt-1 text-lg font-semibold text-slate-800">
            Aisha Khan
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Department</p>
          <p className="mt-1 text-lg font-semibold text-slate-800">
            Human Resources
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Email</p>
          <p className="mt-1 text-lg font-semibold text-slate-800">
            aisha@emshub.com
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Status</p>
          <p className="mt-1 text-lg font-semibold text-slate-800">Active</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
