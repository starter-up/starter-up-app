import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { Idea } from '../../schemas';
import { IdeaService } from '../../services';
import { IdeaListItem } from './idea-list-item';

const Background = styled.div`
    padding: 50px 20% 10px;
    background-color: ${CONSTANTS.COLORS.white};
    min-height: 100vh;
`;

export const IdeaList: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);

    useEffect(() => {
        const promise = async () => {
            const { ideas: retrievedIdeas } = await IdeaService.browse();
            setIdeas(retrievedIdeas);
        };
        promise();
    }, []);

    return (
        <Background>
            {ideas.length > 0 &&
                ideas.map((idea, index) => {
                    return <IdeaListItem key={index} idea={idea} />;
                })}
        </Background>
    );
};
