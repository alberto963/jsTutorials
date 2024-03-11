import cx from 'classnames';
import { Component } from 'react';

export default class LikeButton extends Component {
    render() {
        return (
            <>
                <div>
                    <h2>Like Button</h2>
                </div>
                <style>{`
                    .like-button {
                        font-size: 1rem;
                        padding: 5px 10px;
                        color:  #585858;
                    }
                   .liked {
                        font-weight: bold;
                        color: #1565c0;
                   }
                `}</style>
            </>
        );
    }
}
