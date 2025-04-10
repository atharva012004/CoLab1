import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="text-center text-white p-8 rounded-lg shadow-lg bg-opacity-50 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    CoLab: Where Ideas Converge, Collaboration Thrives
                </h1>
                <p className="text-xl md:text-2xl font-light">
                    Join hands with creative minds, share knowledge, and build something amazing together.
                </p>
                <div className='mt-9'>

                    <Link 
                        to="/try-it"
                        className=" no-underline text-white hover:text-gray-200 px-4 py-2 bg-yellow-500 rounded-md"
                    >
                        Try It CoLab
                    </Link>
                </div>

            </div>


        </div>
    );
};

export default Home;
