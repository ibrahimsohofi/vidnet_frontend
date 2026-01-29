
import { Link } from 'react-router-dom'

const DownloaderPage = () => {
    return (
        <div className='h-screen justify-center flex flex-col items-center bg-gray-200 text-lg font-bold'>
            <h1>Page in Development
            </h1>
            <Link to="/" className='bg-gray-300 p-3 rounded-md'  > Return to home page</Link>
        </div>
    )
}

export default DownloaderPage
