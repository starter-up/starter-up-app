import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Button,
    Card,
    Form,
    Header,
    Icon,
    Input,
    List,
} from 'semantic-ui-react';
import styled from 'styled-components';

import { CONSTANTS } from '../../constants';
import { AuthContext } from '../../contexts';
import { User } from '../../schemas';
import { MemberService } from '../../services';

const Background = styled.div`
    padding: 50px 20% 10px;
    background-color: ${CONSTANTS.COLORS.white};
    min-height: 100vh;
    font-size: 2.5vw;
    &&&&&& {
        color: ${CONSTANTS.COLORS.black};

        .field {
            margin-bottom: 1.7em;
        }
    }
`;

const Title = styled(Header)`
    &&&&& {
        font-size: 2em;
        color: ${CONSTANTS.COLORS.black};
    }
`;

const CardWrapper = styled(Card)`
    &&&&& {
        padding: 20px;
    }
`;

const ListItem = styled.div`
    &&&&& {
        .icon {
            cursor: pointer;
        }
    }
`;

const Error = styled.div`
    &&&&& {
        color: ${CONSTANTS.COLORS.red};
    }
`;

export const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { user, logout } = useContext(AuthContext);
    if (!user) {
        return <></>;
    }
    const [portfolios, setPortfolios] = useState<string[]>([]);
    const [portfolio, setPortfolio] = useState('');
    const [portfolioError, setPortfolioError] = useState('');

    const onSubmit = (data) => console.log('submitting', data, errors);

    const handleAddPortfolio = () => {
        if (!portfolio) {
            return;
        }
        if (portfolio.indexOf(',') > -1) {
            setPortfolioError("portfolio can't contain ,");
            return;
        }
        setPortfolios([...portfolios, portfolio]);
        setPortfolio('');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePortfolioChange = (event: unknown, { value }: any) => {
        setPortfolio(value);
        setPortfolioError('');
    };

    const handlePortfolioDelete = (index: number) => {
        const newPortfolios = [
            ...portfolios.slice(0, index),
            ...portfolios.slice(index + 1),
        ];
        setPortfolios(newPortfolios);
    };

    return (
        <Background>
            <Title>Register</Title>
            <CardWrapper fluid>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            {...register('screenName', { required: true })}
                        />
                        {errors.screenName && <Error>Required</Error>}
                    </Form.Field>
                    <Form.Field>
                        <label>Summary</label>
                        <input {...register('summary', { required: true })} />
                        {errors.summary && <Error>Required</Error>}
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <div>{user.email}</div>
                    </Form.Field>
                    <Form.Field>
                        <label>LinkedIn</label>
                        <input {...register('linkedIn')} />
                    </Form.Field>
                    <Form.Field>
                        <label>Portfolio</label>
                        <Input
                            action={{
                                content: 'Add',
                                onClick: handleAddPortfolio,
                            }}
                            value={portfolio}
                            onChange={handlePortfolioChange}
                        />
                        <Error>{portfolioError}</Error>
                        <List>
                            {portfolios.map((item, index) => (
                                <ListItem key={index}>
                                    <Icon
                                        name="delete"
                                        onClick={() =>
                                            handlePortfolioDelete(index)
                                        }
                                    />
                                    <span>{item}</span>
                                </ListItem>
                            ))}
                        </List>
                    </Form.Field>
                    <Form.Field>
                        <label>Specialty</label>
                        <select {...register('specialty', { required: true })}>
                            <option value="idea">idea</option>
                            <option value="design">design</option>
                            <option value="sales">sales</option>
                            <option value="marketing">marketing</option>
                            <option value="technology">technology</option>
                        </select>
                    </Form.Field>
                    <Button.Group fluid>
                        <Button onClick={logout}>Cancel</Button>
                        <Button.Or />
                        <Button type="submit">Submit</Button>
                    </Button.Group>
                </Form>
            </CardWrapper>
        </Background>
    );
};
