import './styles.css'
import Slide from './slide';
import { VideoZone } from '@/type/bili';
import { useEffect, useState } from 'react';
import { getRegionNew } from '@/api/biliApi';
import { List, RegionNewResp, VideoListRespCode } from '@/type/home';

type TypeOneProps = {
    videoZone: VideoZone
} & React.HTMLAttributes<HTMLDivElement>

export default function TypeOne({
    videoZone, ...props
}: TypeOneProps) {
    const [list, setList] = useState<List>()

    const getNewVideoDate = async () => {
        console.log('get new data');

        // Send request to get must-do content
        const regionNewResp = JSON.parse(await getRegionNew(videoZone) as string) as RegionNewResp
        // Check if request is error
        if (regionNewResp.code !== VideoListRespCode.SUCCESS) return
        // Set resp to state
        setList(regionNewResp.data.archives)
    }

    useEffect(() => {
        getNewVideoDate()
    }, [])

    return (
        <div className='fresh-home-categories-bangumi' {...props}>
            <div className='fresh-home-categories-bangumi-timeline'>
                <div className="fresh-home-categories-bangumi-timeline-header">
                    <div className="fresh-home-sub-header">
                        <div className="fresh-home-sub-header-dot">
                        </div>
                        有新动态
                    </div>
                </div>
                {list && <Slide list={list} getNewVideoDate={getNewVideoDate} />}
            </div>
            <div className='fresh-home-categories-bangumi-rank-list'>
                <div className="fresh-home-sub-header">
                    <div className="fresh-home-sub-header-dot"></div>
                    排行榜
                </div>
                {/* <div className='w-96 h-[30rem]'>
                    <div className='p-4 relative'>
                        <div className='relative'>
                            <div className='border border-bili_grey w-full h-20 rounded-lg shadow-sm'></div>
                            <div className='absolute top-2 left-3 w-80 h-10 line-clamp-1'>dfj29hy789r23hfe8ah8w8fbg28bf2837f879gwefhb87wb23bfr8bdwbfui89a</div>
                            <a className='absolute top-10 left-12 rounded-lg overflow-hidden'>
                                <img className='w-64 h-40' src="data:image/jpeg;base64,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" alt="" />
                            </a>
                            <div className='fresh-home-rank-list-laser ml-44 mt-28' data-number='1'></div>
                        </div>
                    </div>
                </div> */}
                <div className='fresh-home-rank-list relative'>
                    <div>
                        <div className='h-28 border border-bili_grey rounded-xl px-3 py-2'>aaa</div>
                        <div className='bg-pink-200 h-24 mt-32 ml-28 rounded-xl'>aaa</div>
                        <div className='bg-pink-200 w-72 h-24 mt-8 rounded-xl'>aaa</div>
                    </div>
                    <div className='fresh-home-rank-list-first-item animation absolute top-0 left-0'>
                        <div className='fresh-home-rank-list-rank-item'></div>
                        <div className='fresh-home-rank-list-rank-item-title'></div>
                        <div className='fresh-home-rank-list-rank-item-title'></div>
                        <a className='fresh-home-rank-list-cover'>
                            <img className='w-56 h-40' src="data:image/jpeg;base64,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" alt="" />
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='1'></div>
                    </div>
                    <div className='fresh-home-rank-list-second-item animation'>
                        <a className='fresh-home-rank-list-rank-item'>
                            <div className='fresh-home-rank-list-rank-item-title'></div>
                            <a className='be-up-info fallback'></a>
                            <div className='fresh-home-rank-list-stats'></div>
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            <img className=' w-36 h-24' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EAEYQAAEDAgIECwYDBgUDBQAAAAIAAQMEERIhBRMiMQYyQUJRUmFxgZGhFCNiscHwctHhByRDU4KSJTNjorIVFvFEVKPS4v/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAQADAAIDAQEBAQEAAAAAAAABAhESIQMxQRMiMlEE/9oADAMBAAIRAxEAPwAbApNGr2BSYF1PPDtGpMCIEFNo0wHYE+rRDRqbRoRIVo1Jo0U0ak0aCCMCkwIl4k7RoAfVp2BEtGnaNMg7RqWrRDRqTAgpDatPgRLRp9WggurS1aKwJYEAJq0zxovAmcEAG8ai4IxwUHjQcA3BRcEY8ag8aDC4EkTq0kBFo07RK5gVois2odolJgRTAp6pGgM0alqkQ0SkII0sDNGpMCLaNLUo0cQzRpatFNClqiTiRxDtGpNGr2BSYUaXFQ0afVojCpsCNHELq1CR4ogKSUhER4xEVmbvdFVJR09OU0pYYoxuX6dq4PTGkJ6+o2ywxYtmPFk2ds+l9+aNXTxcmvV8I6aIyGnjKbDzuK3Lu5X3LNk4Tz7OGARw8bavfua2Sx+f6l3PkoM2D+1Dojw0h09LwkjOo1dRBhHFxsXSt2A46iLWRFiFeel/mj8Qu3l9+i3ODVWVPpP2c/8AKmts9Dvm3q/qhPk8NZjYdS8ai8aL1abVp65MBPGovGjniUXjRowFq0kXq0kaMUNGptGjGjUmiWet+IQQVgsiNUptElMnFVIiKsaFWNErBBLVcVOpT6pEMCm0aWjiFaNSwonVJniRyPgHeNReJFapNgRyLgFeNOyK1abVI5Dg5zhdJgoooQ5xXLwbL1v5LiZ9iXyce667Phe3vYI/hf0z+q5CdsYD1hG/6fJOJdFa5UHi/wBuRd3I/qou/wB932ykPH+Ert65fTyT4f4f32ffatFGkbil1S+eSOg48UwcYRZ/X9EIO0H4h9Wz+nqjaJuKPwk3k/6pT6Ga9GBsQCQ84WfzzUmBV6F97oyD4RwF3tl9GfxR7RqYlx2r2EeNReNGuCrIUci4hNWmRGFMjkOJNGptGiGjU2jUa04h2jUmjRDRqbRo04qHaNWhEOAiMtrLCOHf03VrRqbAlqsDtGpNGr2BSYUtGKWBSaNWsClgRqogMcSi0KMwqueWCnDWVEkcY9YyZm83U6rFDiOPV4hxYXfDizs1md7dGbeahE0Zf5Uscm1YsJM9n6HtyrkuF2mqQ6iCop5JMUISAPIMrGzXZ2td2y7n5bsuWoNIVtfKOjaeXCNQQsRb3Bme92Z3szM191uTeqyIjXRX/wA1rV10XDCUfbZyAhLCTQgPbZnd/N2bwXHgeOoL4R+rN9V0en6fVBiAeKLsA9l7Xbxy8FhUdMQcfjELv8nVVtEiaZAVwH/ds+P/AJSk5pK7V7H9b/mqzHYL4bLTUYdn53xMf5/JG0Y4JRH47ef/AIQcDYwIf7fvub0R9IOMIi6pC/ldnU2noR7d7wef93EebIAn/UzMz+mDzWwwrJ4PD+5Uxc4SIC7nv9QFbeFZayvXtU4KiQEawpPGjknizkkdqhSRyHA7ApMKprK2CiqKaGXFiqTwBhG+dr59CJchDjqdXxJgUmBM2HmErBRo4mYFJgVospMCNHFSwJ8CvYE+BAxSwJ8CuwJ8KDxRhXCcKpSouEQzVsYzU2BtUJjiG2V7M+V2drr0LCqaikgqA1dRBHMO/CYMTeTpS28Hkjx35TGvFJdDaQl0fPpKX3lHGTAU4kzs93Zmdr55O7Xtlmi+BVMMWmCmqJIxGOEzxkVhbJmvfsZ3z5Lr0rhaFMPBquGqLVwDE2HCPKzthZm7Xs1u1eIzzkYasdmLq+N835VpWs2jGv776+vQNMaT0TVVYjTz+0Raq3uhu1m7eXk3XzyWLUV0HupAgIRG7FLiZ2dr2vZt2T+i57Q9X7LWjrS90WRdj8joyEtUdTTyjslLYBxb3e7s35P+aceOIZTefS2cNucf6x9bqp2HHh6w27+1TCQeKG0UJYC7Wyv4X+TdKaePAcRdW7eD7vvsWiPoaHZP8JN6/b+a1KMPdS/CWz3P+VnWbf8AeCjPqrV0Xt1Gr/nA7dxNuU29Kh3nBp/3Kcf5crGPmzv8vVdJgFcrwTPHLPHziH1yf8107EQBhw9nlkueJTep3hSeNBaT0tHo2nGaojkwkYhs9LvZka1TGnpcZzZR1aSs1opI0sYGmhx8JdAw9U5pON0Dbx3rotWK5+qbFw7oY/5NFIfm7MulZlMy0xQ9MPN2UmpyRLJ2dEEoGIgVgsrWdSZMsV2T2VlkkDEE9lJPYUxiGFJxVjCnwo+ljgv2sT6rQVNCH8aobF3Czv8AN2Xksz85er/tgD/DdHydWY282Z/ovJXW3i9LiFToumrMBwa3a1JiYlyszPufpb5eiEdMrXjVlPVVpFxuX8YPufvs7s60hbHF/wAe79HWDBKJhqZdnDfVH1Hfez9j+i16bF7Jh4pCLv3Ozs9/FndJnaMU1IENRAXgXj+ro+hPAcEn8uVn8Hez/fYh6r3sWs50ZfLN1dS4QqCjPil8ny9Ls6VvRw7Lg9iDSssI8bC2DtdmdrP3u3yXcCOxi4wlmvO6GYotJjNztTj8Ws7+ru3gvS4wxBiHilmPjn9Vy/VWhzfDlh/7flk6s0L/APyCtsqfHxMK5bT+vqP2dFUVBayfUxGZbruxtd104awYhkDFxWfD4In0nEPZpOqkl/1E/wD28qSnYPjLHpy1v7QKnaL3NCLYeTN7+ea6ZlyWgj1vDPT03VGIPJv0XUtIotfJaTC5nUlS0ik0qP0TNZWsyWFQaUU7TCq5wnJWYE+rFV68VJqiNXyqUxY7RKbAotMKfXCnFqpyyWAUsGajrh6yfWDfjKotUZLkv2n0Y1HBWWTnQSgYdOb2dm8Hv4LxCVtte1/tTrBp+DQf6lSAkPSzM7u3ovFarYP1+/Ja0lpSP5UumSSVqJauiJ8YFTn1Xw+LO1vN2WUpwSlFKMgc1BY3L+6/FZ/K36qy/wDlF8Ni8rfRURvsfCJenI3k7K99gPw22vFn+qUlEOk0e+tq6H4ojYvP87r0bgnOVVwfpJi6rj4C7i3ozLzShLDFTVX8vGB9m6z/AD+3XqGgHh/6HQezj7v2cHHudmXNGcpX5f8AMMLSDa39nVYPVikH+03b6LptH4ZaCmLrRC/mzLl3LHwD0oPVKqbylNb/AAcl1ugNHl1qaP8A4slExLK0D9SPVSU8aZX/AAjZeH09cNFLUl7aWKSUsJiZNrLPk93s+e/NH0emKmqqNTS1dVIXNEJSN3bfezdi5Wal1oSyc2Mfm/6IyjqNVFrMUcJFE/FCzu2K1st1rO60vSIjWkdzjopdPyRAUgaSqJB3jt2u3Ta6oi4YVZy6uKeYvxE3J2OyGqA0TRBUjoOT2oqgLOMsLbGd3ZnfdyZrEpKSeKXFs7N+e3kppWto7g77X07mg4RVtRiLXySbWAc2HNmu/I997Kc2ndJRH72rw4sxHZd2bkvZt9lzVDLPSgOOAcIm54sTZ3tvs/YiKuETp5Swjrdk8WF33s92szqZ8cfIEeTepb46c0gH/rSL+kXtfwV8XCOtKIiCSEhErYiCz99vFlxQaXKnpywQU+KQ2wmQuzhboz3Z59ylS6XrfZNIY5xKKMOKYkTNd2Znaz2Z8mzfJTPj69NOodvHwh0hsiMkJcvFzVv/AHNPEGKoKnw/EVvqvPtETynW00mLXbdiiKLELg2+7Xa7Mz33tuTSxaP9rKMCqKgcf+aJCLM2eTC7Fdm6btu3cqJ8UaWw7ubhvSBskUZF8DO/qyBqOHwhh1FFi/Ebt5ZOuertDT1BlWBLRYZBKTBSjhFgGzXcWvhbc+fSgZYamWKClAaf3ZO4yhZidiz2i5bdHIj8aHHkEcLOENXpfR4x1AxxjHMziIC98xJs3d81y5FjD4h+W78vJa+m4SotHxUsuHX655Dw2d7WsLXbsZ3y6zLDXRWMjITM6SScttMqBJJJIgNTR54osJ823p+nyR8Q44sJ8Yci8b5LK0W/vSHrDZbsUf7uUnxN+TqLzhxDUDEWgpRi40g7PRiu7W7bs77s8lpaG4dho3Q9JRnTERQRAxlia26+XmuT0lW/4VFqiLEOZ9xNbPxZ27buoUdUR6QiqoiLFHKOIhw3tud2Ysr2vyWusYprS8xnbqIOFEH/AEDSVAUfvamWdwEb5Mbu979ju6M0XwypqXQEGjxKSOsjhwCeFsLFmzPnyLjKsf8AEymixajEb7RM5Wd3te2V+myEaP2iWIQIY8WREd2ZrXdP8IxnyiZdi3C/SjsztpN7P/piksgdJacEWYdOwMzNZmctySn8qryAFbRR08RF7XDiKlCbARszu7txWblfc/msvWl7PF78SxXxAN7gzPy5ct7qutYjMS/4hZVgEspkIc0XfDk27f3uurGFcj01NHa8w1gjNIXWEbtbtyRtGM+0J01Rxn4wF+SD0fVV1BT4tXGMUhfxQ5e9a9DpaplqIhljh1WLa1Q5u3Zd+myUx0i1+1s9XTDSS0pwFrSw4JcVhZmvdrct8vJZ0elxOrGOWimqIIcphiJ2d2bLezZLppHpqgNTKOr1gvhxAzvn0W5VdoOjpqKIo4sWqEnfauzu7558vS3gpiPiLX63HnVTJBKY+yiUcRcYSLEzFd3yffa1t9335q6mCprTlEBjjiIWaWQRwgzNm17b3y3Zut3SZ6Cr5amb2GSnlxccJrO7s+buFrNf8t73ZsStrh1Qw046uIeKI/N+l3tvTz43iZntdXVFJTgVLo3XarFsnKTOfjazNv5OxOBFEYyARCQ5iQ5Oz97LExktqMZPZBKWMo/xC7X7Wun6Ew1dH6akp9mo99ERM5ge0z26Wf5o+qqxqKcpqWCljpsPvTGFmkjblbdnfkezdrMuUYix7f39/VG0dWVOY+XF5H5O5Ka/U+mVpKq9qqCk63FHoZtzMhZI8ACXWG/b5LS0vBSY/aKWWP3nGgG+WW9uS322W7MuWNUuPSN0k7smQqCSSSQBejSwVH3yPd/RdJQzbFTT/Az/AH0We2fQuUp5CilGQOaSP9sKnlxBtRSDs91rO3byN4MovGqgLPMW1GXVt5O72fzfzUMSepfHLi4wkT97Pyt99KY4S2pA4vqqr6Rb2Z2+JRd0hjI+IJJvhwqtTxk7nnxkksJtzC/tST0diHq/9MS2VcPs2DF/twve/QzoqKhENoB/uv8AVTGmg+EfNZfofFmR1eA9iMdV1SK/zV/tGt2gEYxLmiF3y7UeNPBEAjhxYeLs/movIQ8Sm+SI8hTQPTy7e2WLfs4X38i09E6RqaWUhOMiiLjDhyt9/XpQ3vz2gGMVLWEGzijxdUbfmib7JcIwLpPRtTFLrIo9ZBITOJCTZ8jO7dPT2u6hVaFq6eXVy4eKz7BYmz7VRJpOrM9icox5ohs26M2zuraXTdTEf7wXtEW4hPMm7i3t5quzjqMTGgGIx92RFvxYr27mZvzWqZz1EQwnHiHE7iZETm7u+eVrb7eSjDpHg/xpRqtrjBrTz797erpVGltCBTlHo0aqlKTjkY4me2bNdiu2fYp/oupntmSDt4eqqJj+/wA+xXAM+qEpcRYuJLvaRr2vfpZ/og5H97/S/rl+SuFYHcv93GUUkkKgkkkkAkkkkCTspieOLVnxcWz2P+SaOMj2gEiHC+IhF3ZmtvfsRNPQTkAyHARRb8IlnZ+V232RsEv0XSx7M1VxcTYI8L2e3K/Sy3faI+YOL+myAKSMKeITkKOUSbFiJ2dsrWw27PVTkglliH3mGXdhxWbPld3a1m3b2WVqzJ6IM4z/AIY/1DZUvKIcSDD8Qi2aHGKTW4ubuxEYjbzy9VN3IA2xLFi5pZW6b2dKKT/0clvtJNlhL0SQusj6xt4P/wDVJHCRyWR09dKAlFBUEJcUhid2fxsq5GniPDLijIeaYuz27loS1UFKEHtEEJTySvrSxE9hu2b2e13d3fuZkFpCfDVyxhEI9UQJiZ2d8nvct+XKriE6eEyPa8eK7NZlIKqA+PiHkHc2e7PPLxQDTTgeHCOL4Rv2cqYhk41RGQkVtrO7u3QzJ/mNXyVA7W1i5Bwkzs/lZnbuu6p1pBzhEerib5Nn6KppMe1iIi5uEsrN2uyix83Dxury97qui1RMIgex99yqujicjP8A/O7f5+qofbPb2iLmiPyZkxqhJXsHOMfk29T93zIxxfi+d7IPVg1k4aPGjEtmMym82ZvLN/NVyEJ7QJM2ANshLFzSG/Llnb5XVYsWP8RffYlByqLjplOQcB4VBBwSSSSBIzR1PHUHKMpFsjcRHla9n+i0oaeCLiRj8383WTo+TVVcXVLYLxy+dlscU1Mz2qPTTo4xlAoebIBB5s7fVY7VEsQCIRl7uzCRdjZ2vu7r2WlRSYDFYtU+CrqYzLZGUm4rX3vlff8AfYprHcps14tMQGHvSkHkIDszt35Fez9ng25WlWUktPrDqY+phHENsuV2Z2f+1YPGDEEmzm2LCVrdrvvf5Ks8IfwC+IsTZ/l4q+KW8wwEAkFTtCOyQEJMFms19zvm6GGlqQwza8pByfZHO3Lu8VnBip+OMOHnCVnvu3s2eX0TxvgPCGEuXCJMTdLXs27elhD3eNnsxvZt14iv8k6znad3f3peEpJJ5JCvbRNtfPRwi12ZuLvz5ML99+xkPJKEsojFTxRjkPGdxve93vd+W2TJklQgpRgGcACUpWtvEMI3u+TXe7t2vbuSaOow+0gzjGz4L47uz2bp7HZJJBqxHWgRbRYbuREV7tlyP2v696Z7mOGzkLdZ9zukkgHccOHFs4s+l7bt6mIYxsxCPbh3Z8idJAVVDBCWbOxZYsWedsrW7HV8UJbGOIZMr783Z8+Xot0tyJJJSF8mq2R5x9bfy5PZrOqLS7eDViAlgxYWu7783td97Z/NJJBh5qeQmKeUhty4b9D8ncyEdkkkAySSSFQS6AyxDFJ/MBn82Z0klMqqnAaz9Jm46Ql2cQuTO+Lm5N98qSSK/wCiv6RpZp3lwhhPka/N6Ga/gnDDO5thG/Js5N359N9ySSr4iUThGA9oudxezlt0b+lTNzZ9a7Ynj5Mm5c727e9JJBGaqidmd4Bd/D8kkklQf//Z" alt="" />
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='2'></div>
                    </div>
                    <div className='fresh-home-rank-list-third-item animation'>
                        <a className='fresh-home-rank-list-rank-item'>
                            <div className='fresh-home-rank-list-rank-item-title'></div>
                            <a className='be-up-info fallback'></a>
                            <div className='fresh-home-rank-list-stats'></div>
                        </a>
                        <a className='fresh-home-rank-list-cover'>
                            <img className=' w-28 h-20' src="data:image/jpeg;base64,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" alt="" />
                        </a>
                        <div className='fresh-home-rank-list-laser' data-number='3'></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
