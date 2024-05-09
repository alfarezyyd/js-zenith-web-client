"use client"
import {Button, Image} from "@nextui-org/react";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Siapkan data untuk dikirim ke API
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle respon dari API sesuai kebutuhan
        const data = await response.json();
        console.log('Login berhasil:', data);
        // Lakukan navigasi atau tindakan lain setelah login berhasil
      } else {
        // Handle jika respons tidak berhasil (misalnya, autentikasi gagal)
        console.error('Login gagal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="mt-10 h-screen">
      <div className="flex flex-row">
        <div className="w-3/6">
          <Image src="images/side-image.png" alt="logo"/>
        </div>
        <div className="w-3/6 p-28 mt-16">
          <form className="max-w-md mx-auto my-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" name="floating_email" id="floating_email"
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floating_email"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                address</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="password" name="floating_password" id="floating_password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                     placeholder=" " required/>
              <label htmlFor="floating_password"
                     className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 left-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <Button color="primary" type="submit" className="w-full p-5 text-md" radius="sm">
              Submit
            </Button>
            <Button startContent={<FontAwesomeIcon icon={faGoogle}/>} color="" variant="flat" type="submit"
                    className="w-full mt-5 border-2 p-5 text-md" as={Link}
                    href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
                    radius="sm">
              Login with Google
            </Button>
          </form>

        </div>
      </div>
    </div>
  )
}