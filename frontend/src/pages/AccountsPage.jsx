import React, {useState} from 'react'
import FileTickIcon from '../assets/images/file-tick.svg'
import NoAccounts from '../components/NoAccounts';
import Background from '../assets/images/background.png'
import xicon from "../assets/images/x.svg"
import certificate from '../assets/images/CERTIFICAT DE SCOLARITE.pdf'

const AccountsData = [
    {
      id: 1,
      isProfessional: "false",
      firstname: "Dahmane",
      lastName: "Lharachi",
      time: "02/03/2025",
      email: "Foulanfoulani@gmail.com",
      status : "pending",
    },
    {
      id: 2,
      isProfessional: "true",
      firstname: "Dahmane",
      lastName: "Lharachi",
      time: "02/03/2025",
      email: "Foulanfoulani@gmail.com",
      status : "pending",
      CertificateUrl: FileTickIcon,
    },
    {
      id: 3,
      isProfessional: "true",
      firstname: "Dahmane",
      lastName: "Lharachi",
      time: "02/03/2025",
      email: "Foulanfoulani@gmail.com",
      status : "pending",
      CertificateUrl: Background,
    },
    {
      id: 4,
      isProfessional: "false",
      firstname: "Dahmane",
      lastName: "Lharachi",
      time: "02/03/2025",
      email: "Foulanfoulani@gmail.com",
      status : "pending",
    },
    {
      id: 5,
      isProfessional: "true",
      firstname: "Dahmane",
      lastName: "Lharachi",
      time: "02/03/2025",
      email: "Foulanfoulani@gmail.com",
      status : "pending",
      CertificateUrl: certificate,
    },
  ];

const AccountsPage = () => {
    const [Accounts, setAccounts] = useState(AccountsData);
    const [selectedFile, setSelectedFile] = useState(null);

    const updateStatus = (id, newStatus) => {
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === id ? { ...account, status: newStatus } : account
        )
      );
      console.log(`Account ${id} status updated to: ${newStatus}`);
    };

    const handleDelete = (id) => {
      setAccounts(Accounts.filter(account => account.id !== id));
    };

  return (
    <div className="flex justify-center bg-[#FFFFF1] pt-36 pb-28">
      {Accounts.length > 0 ? (
      <div className="w-3/4">
        {Accounts.map((account) => (
          <div
            key={account.id}
            className='p-4 bg-[#FFF8E3] flex w-full flex-col mb-5 shadow-md rounded-lg' >
            <div className="flex flex-row justify-between items-end">
                <p> <strong className='font-semibold'>{account.firstname}{account.lastName} </strong>wants to create an acount.</p>
              
              {account.isProfessional == 'false' &&
                <span className='text-gray-500 text-sm'>Normal user</span>
              }
              {account.isProfessional == 'true' &&
                <span className='text-gray-500 text-sm'>Expert user</span>
              }
            </div>

              <p className='underline'>{account.email}</p>
              <p className="mt-1 text-xs text-gray-500">{account.time}</p>
                

              {/* Buttons Section */}
              <div className="flex flex-col  items-end ">

              <div className="space-x-2">
                {account.isProfessional === "false" && (
                  <>
                    <button className="px-5 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account.id, "rejected"); handleDelete(account.id);}}>
                      Refuse
                    </button>
                    <button className="px-5 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account.id, "accepted"); handleDelete(account.id);}}>
                      Accept
                    </button>
                  </>
                )}
                {account.isProfessional === "true" && (
                  <>
                    <button
                      className="px-5 pt-1 pb-1 text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]"
                      onClick={() => {
                        if (account.CertificateUrl) {
                          setSelectedFile(account.CertificateUrl);
                        } else {
                          alert("No certificate available!");
                        }
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <img src={FileTickIcon} alt="file tick icon" />
                        <span>See identification file</span>
                      </div>
                    </button>

                    <button className="px-5 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account.id, "rejected"); handleDelete(account.id);}}>
                      Refuse
                    </button>
                    <button className="px-5 pt-1 pb-1 bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                     onClick={() => {updateStatus(account.id, "accepted"); handleDelete(account.id);}}>
                      Accept
                    </button>
                  </>
                )}
              </div>
            </div>
          </div> 
        ))}
      </div>
      ) : (
        <NoAccounts />
      )}

      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-auto">
          <div className="p-5 rounded-lg ">
            <button className="mb-2 p-2 rounded-full hover:bg-[#00000022]" onClick={() => setSelectedFile(null)}>
              <img src={xicon} alt="return button" className='w-3 h-3 min-w-[12px] min-h-[12px]'/>
            </button>
            <img src={selectedFile} className="w-[600px]" />
            {/* {typeof selectedFile === "string" ? (
              <img src={selectedFile} className="w-[600px]" />
            ) : selectedFile?.type?.startsWith("image/") ? (
              <img src={URL.createObjectURL(selectedFile)} className="w-[600px]" />
            ) : selectedFile?.type === "application/pdf" ? (
              <a href={URL.createObjectURL(selectedFile)} target="_blank" rel="noopener noreferrer">
                Open PDF
              </a>
            ) : (
              <p>Unsupported file type</p>
            )}           */}
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountsPage