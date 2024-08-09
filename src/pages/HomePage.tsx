import { Link, Outlet } from 'react-router-dom'
import Computer from '../assets/computer.svg?react'
import Internet from '../assets/internet.svg?react'
import { PropsWithChildren } from 'react'

const HomePage: React.FC<PropsWithChildren> = () => {
    return (
        <div className="relative w-full min-h-screen h-full items-center bg-[#377e7f]">
            <div className="absolute top-2 left-2 flex flex-col gap-4 ">
                <Link
                    to="/user"
                    className="flex flex-col items-center gap-1  text-white"
                >
                    <Computer />
                    <p className="text-center ">
                        My <br />
                        Computer
                    </p>
                </Link>
                <Link
                    to="/search"
                    className="flex flex-col items-center gap-1 text-white"
                >
                    <Internet />
                    <p className="text-center ">search</p>
                </Link>
            </div>

            <Outlet />
        </div>
    )
}

export default HomePage
