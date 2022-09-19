import { useEffect, useState } from 'react';
import SinglePerson from './SinglePerson';
import generatePerson from './useGeneratePerson';
import './InfiniteHumanList.scss'
import Loader from './Loader';
import { useInView } from 'react-intersection-observer';

const InfiniteHumanList = () => {
    const [data, setData] = useState([{
        name: '',
        surname: '',
        mail: ''
    }]);
    const [isFetching, setIsFetching] = useState(false);
    
    const numberOfPersons = 20;

    const loadData = () =>{
        const list = generatePerson(numberOfPersons)
        setData(list);
    }

    const moreData = () => {
        setIsFetching(true);
        setTimeout(() => {
            setData([...data, ...generatePerson(numberOfPersons)]);
            setIsFetching(false);
        }, 1000) 
    };

    const { ref, inView } = useInView({
        initialInView: true,
        threshold: 1,
    });
    
    useEffect(() => {
      loadData();
    }, [])
  
    useEffect(() => {        
        if (inView){
            moreData();
        }
    }, [isFetching, inView]);  
    
    return (
      <div>
        {
            isFetching &&
            <Loader />
        }
        <div className='human-list'>
            <div ref={ref}>
                {
                    data.map((person) => {
                        return (
                            <SinglePerson
                                person={person}
                            />
                        )
                    })
                }
            </div>
            <div style={{width: '100%', display: 'block'}} id="followed" ref={ref} />
        </div>
        <div className='footer'>
            this is my cool footer
        </div>
      </div>
    );
}

export default InfiniteHumanList;
// MultistepForm