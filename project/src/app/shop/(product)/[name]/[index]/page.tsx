'use client'
import { FC } from 'react';
import Image from '../../../../../../node_modules/next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useSession } from "next-auth/react"
import { useFetchProductDetails, handleAddToCart } from "../../../../util/indexApi"
import { handleThumbnailImage, handleNextImage, handlePreviousImage, handleImageChange } from "../../../../util/indexFunctions"
import Modal from "../../../../components/modal"

interface pageProps {
    params: { index: number }
}

const Page: FC<pageProps> = ({ params }) => {
    const [product, setProduct] = useState<any | null>(null);
    const [image, setImage] = useState('')
    const [modal, setModal] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [imageUrls, setImageUrls] = useState([])
    const [arrayIndex, setArrayIndex] = useState(0)
    const [colorIndex, setColorIndex] = useState(0)

    const router = useRouter()

    const search = useSearchParams();
    const category = search?.get('category')

    const { data: session } = useSession();

    // useEffect to fetch all details about the product 
    useFetchProductDetails(params.index, category, setProduct, setImage, setImageUrls);

    return (
        <>
            <Modal modal={modal} setModal={setModal} cartItems={cartItems} router={router} image={imageUrls[0]} />
            {product && (
                <section className='flex flex-col items-center justify-center lg:h-screen'>
                    <div className='flex flex-col my-5'>
                        <h1 className='font-bold text-center lg:hidden'>{product.name}</h1>
                    </div>
                    <div className='lg:flex'>
                        <div className="lg:flex lg:flex-col lg:w-1/2 lg:items-center">
                            <div className='w-3/4 mx-auto flex flex-col items-center justify-center lg:w-1/2'>
                                <div className='relative flex justify-center'>
                                    <BsChevronLeft className="absolute left-0 top-[50%] bg-[red] text-white h-10 w-5 cursor-pointer" onClick={() => handlePreviousImage(arrayIndex, setImage, setArrayIndex, imageUrls)} />
                                    <Image src={image} alt={`Picture of ${product.name}`} width={500} height={500} className='md:w-3/4 lg:w-[1000px]' />
                                    <BsChevronRight className="absolute top-[50%] right-0 bg-[red] text-white h-10 w-5 cursor-pointer" onClick={() => handleNextImage(arrayIndex, imageUrls, setArrayIndex, setImage)} />
                                </div>
                                <div className='flex justify-evenly my-5 lg:hidden'>
                                    <div className='flex justify-evenly my-2 gap-x-5'>
                                        {product?.colors.map((colors: any, index: number) => (
                                            <div key={index}>
                                                <Image src={colors.colorImage} alt="" width={500} height={500} className='cursor-pointer h-12 w-12' onClick={() => handleImageChange(colors.colorImage, index, setImage, product, setImageUrls, setArrayIndex, setColorIndex)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='hidden lg:flex gap-x-4'>
                                {imageUrls.map((images, index) => (
                                    <div key={index} className='h-16 w-16 mt-10' >
                                        <Image src={images} height={500} width={500} className={`cursor-pointer p-1 ${arrayIndex === index ? 'border-2 border-[red]' : ''}`} onClick={() => handleThumbnailImage(images, index, setArrayIndex, setImage)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col lg:w-1/2 lg:justify-center lg:mr-10'>
                            <div>
                                <h1 className='hidden font-bold text-2xl justify-center lg:flex'>{product.name}</h1>
                                <p className='font-bold text-center'>Color: {product.colors[colorIndex].color}</p>
                            </div>
                            <div className='my-5'>
                                <hr />
                                <p className='py-5 text-center margin'>{product.description}</p>
                                <hr />
                            </div>
                            <div className='hidden lg:flex lg:flex-col lg:w-1/2 lg:mx-auto'>
                                <div className='flex my-2 gap-x-5 justify-center'>
                                    {product?.colors.map((colors: any, index: number) => (
                                        <div key={index}>
                                            <Image src={colors.colorImage} alt="" width={500} height={500} className='cursor-pointer h-12 w-12' onClick={() => handleImageChange(colors.colorImage, index, setImage, product, setImageUrls, setArrayIndex, setColorIndex)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col items-center my-5'>
                                <p className='font-bold pb-2'>${product.price}</p>
                                <button className='bg-[red] text-white button' onClick={() => handleAddToCart(session, product, image, setCartItems, setModal, modal)}>Add to Bag</button>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }
        </>
    );
}

export default Page;