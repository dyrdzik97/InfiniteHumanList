import { FC, RefObject } from "react";
import './InfiniteHumanList.scss';

export interface ISinglePersonProps {
    person: {
        name: string;
        surname: string;
        mail: string;
    },
    ref?: RefObject<HTMLDivElement>
}

const SinglePerson: FC<ISinglePersonProps> = ({ person, ref }) => {

    const {
        name,
        surname,
        mail,
    } = person;

    return (
        <div ref={ref} className="single-person">
            <span>{name}</span>
            <span>{surname}</span>
            <span>{mail}</span>
        </div>
    )
}

export default SinglePerson;