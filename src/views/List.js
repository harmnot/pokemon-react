import React from "react";
import P from "../Api";
import Card from "../components/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { Route } from "react-router-dom";
import { Choose} from "./Home";

class List extends React.Component {
    state = {
        data: [],
        hasMore: true,
        page: 1
    };

    componentDidMount() {
       this.fetchMoreData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.type !== this.props.match.params.type) {
            this.refresh()
        }
    }


    refresh = () => {
        this.setD()
        this.checkRender()
        this.fetchMoreData()
    }


    setD = () => {
        this.setState({data: []})
        this.setState({page: 0})
    }

    getAll = async () => {
        let poke;
        const interval = {
            offset: this.state.page,
            limit: 40
        }
        if(this.props.match.params.type === "pokemon") {
            poke = await P.getPokemonsList(interval)
            if(poke["results"].length === 0) {
                this.setState({ hasMore: false });
            }
            return poke.results.map(resp => resp.url)
        } else {
            poke = await P.getTypeByName(this.props.match.params.type)
            return poke.pokemon.map(v => v.pokemon.url )
        }
    }

    fetchMoreData = () =>  {
        this.getAll()
            .then(resp => Promise.all(resp.map(url => fetch(url).then(final => final.json()))))
            .then(respond => {
                const result = []
                for(const value of respond) {
                    const img = "https://www.clipartmax.com/png/middle/129-1298368_ref-pokeball-transparent-background.png"
                    result.push(
                        {
                            name: value["name"],
                            pic: value["sprites"]["front_default"] ? value["sprites"]["front_default"] : img ,
                            types: value["types"].map(arrType => arrType["type"]["name"])
                        }
                    )
                }
                this.setState({page: this.state.page += 1 + 20})
                if(this.props.match.params.type !== "pokemon") {
                    if(result.length === 0) {
                        this.setState({ hasMore: false });
                    }
                    this.setState({data: [...this.state.data, ...result]})
                } else {
                    this.setState({data: [...this.state.data, ...result]})
                }

            })
            .catch(e => this.setState({data: "error"}))
    }

    title = () => {
        if(this.props.match.params.type === "pokemon") {
            return (
                <h3 className="my-5 text-center"> List all Pokemon </h3>
            )
        } else {
            return (
                <h3 className="my-5 text-center"> List all Pokemon type of {this.props.match.params.type} </h3>
            )
        }
    }

    checkRender = () => {
        if(this.state.data === "error") {
            return (
                <>
                    <div className="center-t">
                        <span> something error</span>
                    </div>
                </>
            )
        } else if (this.state.data.length === 0) {
            return (
                <>
                    <div className="center-t">
                        <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </>
            )
        } else {
            if(this.props.match.params.type === "pokemon") {
                return (
                    <div id="list-poke">
                        <InfiniteScroll
                            dataLength={this.state.data.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={
                                <div style={{ textAlign: "center" }}>
                                    <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }
                            endMessage={
                                <div style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </div>
                            }
                        >
                            <div className="d-flex flex-row flex-wrap justify-content-center card-list">
                                {this.state.data.map((value, index) => (
                                    <div key={index} className="">
                                        <Card
                                            name={value.name}
                                            source={!value.pic ? `no-poke-1.jpg` : value.pic}
                                            types={value.types}
                                            c={index}/>
                                    </div>
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                )
            } else {
                return (
                    <div id="list-poke">
                        <div className="d-flex flex-row flex-wrap justify-content-center card-list">
                            {this.state.data.map((value, index) => (
                                <div key={index} className="">
                                    <Card
                                        name={value.name}
                                        source={!value.pic ? `no-poke-1.jpg` : value.pic}
                                        types={value.types}
                                        c={index}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        }
    }

    navBarAction = () => {
        const nav = document.getElementById("open-side-panel")
        if(nav) {
            nav.style.width = "60vw";
        }
    }

    closeNavBar = () => {
        const nav = document.getElementById("open-side-panel")
        if(nav) {
            nav.style.width = "0";
        }
    }

    render() {
        return (
            <>
                <div className="bg-y-2 py-2 px-4">
                    <div id="open-side-panel" className="sidepanel bg-y-2">
                        <a className="closebtn" onClick={this.closeNavBar}>×</a>
                        <div className="col-lg-8 mx-auto mt-5">
                            <Choose />
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <span onClick={this.navBarAction} className="align-self-baseline"> ☰ </span>
                        <span className="logo"> warung pokemon </span>
                    </div>
                </div>
                <Route exact path={`/all/:type`}>
                    {this.title()}
                    {this.checkRender()}
                </Route>
            </>
        )
    }
}

export default List
