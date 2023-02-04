import { useNavigation } from '@react-navigation/native'
import {Text} from 'react-native'

export function HabitsEmpty(){
   
   const {navigate}= useNavigation()
    return(
        <Text className='text-zinc-400 text-base'>
            VocÊ ainda não esta monitorando nenhum hábito {' '}

            <Text className='text-violet-400 text-base-underline active:text-violet-500'
            onPress={()=>navigate('new')} 
            >
Começe criando um Hábito!!


            </Text>

        </Text>


    )



}