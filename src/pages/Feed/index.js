import React,{useState,useEffect,useCallback} from 'react';
import {View,FlatList } from "react-native"
import LazyImage from "../../components/LazyImage"
import {Post,Avatar,Name,Header,Description,Loading} from "./styled"
export default props => {
    const [feed,setFeed] = useState([])
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [total,setTotal]  = useState(0)
    const [refreshing,setRefreshing]=  useState(false)
    const [viewable,setViewable] = useState([])

    async function loadPage(pageNumber=page,shouldRefresh=false){
        if(total && pageNumber>total) return null;

        console.log("feed")
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:3001/feed?_expand=author&_limit=5&_page=${pageNumber}`)
            const data = await response.json()
            console.log("feed: ",data)
            const totalItems =  response.headers.get("X-Total-Count")
            setTotal(Math.floor(totalItems/5))
            setFeed(shouldRefresh?data:[...feed,...data])
            
            setPage(page+1);
            setLoading(false)
        } 
        catch (err) {
            console.log(Object.getOwnPropertyDescriptors(err))
        }
    }
    useEffect(()=>{
        loadPage()
    },[])

    async function refreshList(){
        setRefreshing(true)
        await loadPage(1,true)
        setRefreshing(false)
    }
    
    const handleViewableChanged = useCallback(({ changed })=>{
        setViewable(changed.map(({item})=>item.id))
    },[])

    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={post=>String(post.id)}
                onEndReachedThreshold={0.1} // Carrega mais itens quando chegar em 10% do fim
                onEndReached={()=>loadPage()} // Função que carrega mais itens
                onRefresh={()=>refreshList()} // Função dispara quando o usuário arrasta a lista pra baixo
                refreshing={refreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
                // Restante das props
                //onViewableItemsChanged={handleViewableChanged} //Função Chamado quando a visibilidade das linhas é alterada, conforme definido pelo objeto viewabilityConfig
                //viewabilityConfig={{viewAreaCoveragePercentThreshold:20}}
                ListFooterComponent={loading && <Loading/>}
                renderItem={({item:post})=>(
                    <Post>
                        <Header>
                            <Avatar source={{uri:post.author.avatar}} />
                            <Name>{post.author.name}</Name>
                        </Header>
                        <LazyImage
                            shouldLoad={viewable.includes(post.id)}
                            smallSource={{uri:post.small}}
                            aspectRatio={post.aspectRatio} 
                            source={{uri:post.image}} 
                        />
                        <Description>
                            <Name>{post.author.name}</Name> {post.description}        
                        </Description>
                    </Post>
                )}
            />
        </View>
    )
}