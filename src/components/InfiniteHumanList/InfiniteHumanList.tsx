import { useEffect, useRef, useState } from 'react';
import SinglePerson from './SinglePerson';
import generatePerson from './useGeneratePerson';
import './InfiniteHumanList.scss'
import Loader from './Loader';
import useIntersectionObserver from '../../hooks/useIntersectionOberver';

const InfiniteHumanList = () => {
    const [data, setData] = useState([{
        name: '',
        surname: '',
        mail: ''
    }]);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    
    const numberOfPersons = 20;

    const loadData = () =>{
        const list = generatePerson(numberOfPersons)
        setData(list);
    }

    const moreData = () => {
        setTimeout(() => {
            console.warn('timeout');
            
            setData([...data, ...generatePerson(numberOfPersons)]);
            setPage(page + 1); // niepotrzebe przy intersextion observer
            setIsFetching(false);
        }, 1000) 

        console.warn('after timeout');
    };

    const isScrolling = () => {
      // useIntersectionObserver
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight){

        // console.warn('inside scroll', window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight);

        return;
      }
      setIsFetching(true);
      console.warn('isscroll');
    }
    
    useEffect(() => {
      loadData();
      window.addEventListener('scroll', isScrolling);
      return () => window.removeEventListener('scroll', isScrolling);
    }, [])
  
    useEffect(() => {        
        if (isFetching){
            moreData();
        }
    }, [isFetching, data]);

    const ref = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(ref, {threshold: 1})
    const isVisible = !!entry?.isIntersecting
  
    console.log(`Render Section`, { isVisible, int: entry?.isIntersecting, ref })

  
    return (
      <div>
        {
            isFetching &&
            <Loader />
        }
        <div className='human-list'>
            <div ref={ref}>
                {
                    data.map((person, index) => {
                        return (
                            <SinglePerson
                                // ref={ref}
                                person={person}
                            />
                        )
                    })
                }
            </div>
            <div className='page-number'>
                {page}
            </div>
        </div>
        <div className='footer'>
            this is my cool footer
        </div>
      </div>
    );
}

export default InfiniteHumanList;
// MultistepForm