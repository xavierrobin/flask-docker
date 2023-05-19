'use client'
import { useRouter } from 'next/navigation'

function BackButton() {
    const router = useRouter()
    return (
        <div className="float-end d-inline">
            <button className='btn btn-secondary' type="button" onClick={() => router.back()}>
                Back
            </button>
        </div>
    )
}

export default BackButton;