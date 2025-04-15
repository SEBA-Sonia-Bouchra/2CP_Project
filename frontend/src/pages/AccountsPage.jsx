import React, {useState, useEffect } from 'react';
import FileTickIcon from '../assets/images/file-tick.svg'
import NoAccounts from '../components/NoAccounts';
import Background from '../assets/images/background.png'
import NavbarProfessional from '../components/NavbarProfessional';
import Footer from '../components/Footer';
import NavbarAdmin from '../components/NavbarAdmin.jsx'

const AccountsData = [
  {
    id: 1,
    isProfessional: "false",
    firstname: "Youssef",
    lastName: "Alami",
    time: "02/03/2025",
    email: "youssef.alami@gmail.com",
    status: "pending",
  },
  {
    id: 2,
    isProfessional: "true",
    firstname: "Layla",
    lastName: "Mansouri",
    time: "02/03/2025",
    email: "layla.mansouri@gmail.com",
    status: "pending",
    CertificateUrl: "/CERTIFICAT DE SCOLARITE.pdf",
  },
  {
    id: 3,
    isProfessional: "true",
    firstname: "Omar",
    lastName: "Najdi",
    time: "02/03/2025",
    email: "omar.najdi@gmail.com",
    status: "pending",
    CertificateUrl: "/CERTIFICAT DE SCOLARITE.pdf",
  },
  {
    id: 4,
    isProfessional: "false",
    firstname: "Samira",
    lastName: "Bennani",
    time: "02/03/2025",
    email: "samira.bennani@gmail.com",
    status: "pending",
  },
  {
    id: 5,
    isProfessional: "true",
    firstname: "Karim",
    lastName: "Zeroual",
    time: "02/03/2025",
    email: "karim.zeroual@gmail.com",
    status: "pending",
    CertificateUrl: "/CERTIFICAT DE SCOLARITE.pdf",
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

    useEffect(() => {
      if (selectedFile) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto"; 
      }
    
      return () => {
        document.body.style.overflow = "auto"; 
      };
    }, [selectedFile]);

  return (
    <>
    <div className="flex justify-center min-h-screen bg-[#FFFFF1] pt-36 pb-28 font-montserral">
      {Accounts.length > 0 ? (
      <div className="w-3/4">
        {Accounts.map((account) => (
          <div
            key={account.id}
            className='p-4 bg-[#FFF8E3] flex w-full flex-col mb-5 shadow-md rounded-lg' >
            <div className="flex flex-row justify-between items-end">
                <p> <strong className='font-semibold'>{account.firstname} {account.lastName} </strong>wants to create an acount.</p>
              
              {account.isProfessional == 'false' &&
                <span className='text-gray-500 text-sm whitespace-nowrap self-start'>Normal user</span>
              }
              {account.isProfessional == 'true' &&
                <span className='text-gray-500 text-sm whitespace-nowrap self-start'>Expert user</span>
              }
            </div>

            <a href={`mailto:${account.email}`} className='underline hover:text-blue-800'>
              {account.email}
            </a>
            <p className="mt-1 text-xs text-gray-500">{account.time}</p>
                

              {/* Buttons Section */}
              <div className="flex flex-col  items-end ">

              <div className="space-x-2">
                {account.isProfessional === "false" && (
                  <>
                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account.id, "rejected"); handleDelete(account.id);}}>
                      Refuse
                    </button>
                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account.id, "accepted"); handleDelete(account.id);}}>
                      Accept
                    </button>
                  </>
                )}
                {account.isProfessional === "true" && (
                  <>
                    <button
                      className="px-5 pt-1 pb-1 shadow-sm text-[#213824CC] text-base rounded-full hover:text-[#21382499] border border-[#213824CC] hover:border-[#21382499]"
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

                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
                    onClick={() => {updateStatus(account.id, "rejected"); handleDelete(account.id);}}>
                      Refuse
                    </button>
                    <button className="px-5 pt-1 pb-1 shadow-md bg-[#213824CC] text-[#FFF8E3] text-base rounded-full hover:bg-[#21382499]"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center overflow-y-auto mt-20 pt-4 z-40">
          <div className="p-5 rounded-lg w-full flex justify-center relative">
            <button className="absolute left-4 top-4 p-[9px] rounded-full flex items-center justify-center hover:bg-[#00000033]" onClick={() => setSelectedFile(null)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.36a1 1 0 1 1 1.414 1.414L13.415 10.586l4.36 4.361a1 1 0 0 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.36-4.36-4.36-4.36a1 1 0 0 1 0-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <object data={selectedFile}
            type='application/pdf' className='w-3/4 h-screen z-50'/>
    
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default AccountsPage