import React, { PureComponent, FormEvent } from 'react'
import { History } from 'history'
import { Market } from '../../context'
import CategoryImage from '../../components/atoms/CategoryImage'
import Image from '../../components/atoms/Img'
import CategoryLink from '../../components/atoms/CategoryLink'
import Links from '../../components/atoms/Links'
import Route from '../../components/templates/Route'
import styles from './index.module.scss'
import meta from '../../data/meta.json'
import Content from '../../components/atoms/Content'
import AssetsLatest from '../../components/organisms/AssetsLatest'
import ChannelTeaser from '../../components/organisms/ChannelTeaser'
import Search from './Search'
import withTracker from '../../hoc/withTracker'
import { showChannels } from '../../config'

interface HomeProps {
    history: History
}

interface HomeState {
    search?: string
}

class Home extends PureComponent<HomeProps, HomeState> {
    public static contextType = Market

    public searchAssets = (
        search: string,
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()
        this.props.history.push(`/search?text=${search}`)
    }

    public render() {
        console.log(this.context.subcategories)
        return (
            <Route
                title={meta.title}
                description={meta.description}
                className={styles.home}
            >
                <Content>
                    <Search searchAssets={this.searchAssets} />
                </Content>
                

                <Content wide>
                    {showChannels && (
                        <>
                            <h2 className={styles.title}>Featured Data</h2>
                            <ChannelTeaser channel="ai-for-good" />
                        </>
                    )}
                    <AssetsLatest />
                </Content>

                <Content wide>
                    <h2 className={styles.title}>Explore Grand Challenge Categories</h2>
                    <div className={styles.categories}>
                        {this.context.categories
                            .sort((a: any, b: any) => a.localeCompare(b)) // sort alphabetically
                            .map((category: string) => (
                                <CategoryLink
                                    category={category}
                                    key={category}
                                    className={styles.category}
                                >
                                    <CategoryImage category={category} />
                                    <h3>{category}</h3>
                                </CategoryLink>
                            ))}
                    </div>
                </Content>
                <Content wide>
                    <h2 className={styles.title}>Explore Technologies</h2>
                    <div className={styles.categories}>
                        {this.context.subcategories
                            .sort((a: any, b: any) => a.localeCompare(b)) // sort alphabetically
                            .map((subcategory: string) => (
                                <Links
                                    subcategory={subcategory}
                                    key={subcategory}
                                    className={styles.category}
                                >
                                    <Image subcategory={subcategory} />
                                    <h3>{subcategory}</h3>
                                </Links>
                            ))}
                    </div>
                </Content>
                
               
                
            </Route>
        )
    }
}

export default withTracker(Home)
