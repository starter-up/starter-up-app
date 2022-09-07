import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { StoreContext, useProjectService } from '../../store';
import { ProjectListItem } from './project-list-item';

const Background = styled.div`
    padding: 50px 20% 10px;
    background-color: ${CONSTANTS.COLORS.white};
    min-height: 100vh;
`;

export const ProjectList: React.FC = () => {
    const { store } = useContext(StoreContext);
    const { projects } = store.entities;
    const { browseProjects } = useProjectService();

    useEffect(() => {
        (async () => {
            await browseProjects();
        })();
    }, []);

    return (
        <Background>
            {projects.all.length > 0 &&
                projects.all.map((project, index) => {
                    return (
                        <ProjectListItem
                            key={index}
                            project={projects.byUUID[project]}
                        />
                    );
                })}
        </Background>
    );
};
