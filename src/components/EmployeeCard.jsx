const EmployeeCard = ({ employee, onClick }) => {
    return (
        <div className="flex-none w-full px-2">
            <div className="black-linear rounded-lg overflow-hidden text-white">
                <img
                    src={`/images/users/user-3.png`}
                    alt={employee.name}
                    className="w-full h-[15rem] object-cover"
                />
                <div className="p-4 space-y-7">
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <h3 className="font-medium text-[22px]">{employee.name}</h3>
                            <p className="text-[13px] font-normal text-green-100 py-2 px-3 rounded-3xl bg-green-100/15 w-[fit-content]">{employee.profession}</p>
                        </div>
                        <div className="flex   flex-1 gap-3 justify-end items-end">
                            <span className="text-[35px] font-bold">${99}</span>
                            <span className="text-[12px] font-medium mb-3">/monthly</span>
                        </div>
                    </div>

                    <p className="text-[15px] font-normal">{employee.description}</p>

                    <button className="w-full btn-linear-gradient text-white py-2 rounded-md  transition-colors" onClick={onClick}>
                        Get started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard