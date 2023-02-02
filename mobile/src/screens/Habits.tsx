import {View,ScrollView,Text, Alert} from 'react-native'
import { BackButton } from '../components/BackButton';
import {useRoute} from '@react-navigation/native'
import { generateProgressPercentage } from '../utils/generate-progress-percetange';
import dayjs from 'dayjs'
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/CheckBox';
import { useState ,useEffect} from 'react';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';
interface Params{

    date:string;
}


interface DayInfoProps{

    completedHabits:string[],
    possibleHabits:{
        id:string,
        title:string,
    }[]
}

export function Habit(){
    const[loading,setLoading] = useState(true)
    const [dayInfo,setDayinfo]= useState<DayInfoProps | null >(null)
    const[completedHabits,setCompletehabits]= useState<string[]>([])
    const route = useRoute()
    const {date} = route.params as Params;

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitsProgress = dayInfo?.possibleHabits.length?
     generateProgressPercentage(dayInfo.possibleHabits.length,completedHabits.length) :0

    const fetchHabits =  async()=>{
        try{
            setLoading(true)


            const response = await api.get('/day',{params:{date}})

            setDayinfo(response.data)
            setCompletehabits(response.data.completedHabits)
        }
        catch(error){
            console.log(error)
            Alert.alert('Ops','Não foi possível as informações dos hábitos')
        }
        finally{
setLoading(false)
        }

    }



    const handleToggleHabit= async (habitId:string)=>{

if(completedHabits.includes(habitId)){

    setCompletehabits(prevState=>prevState.filter(habit=>habit !== habitId))
}else{
setCompletehabits(prevState =>[...prevState,habitId])

}

    }
useEffect(()=>{
fetchHabits()
},[])

    if(loading){
        return(
            <Loading/>
        )

        
    }
    return(

        <View className="flex-1 bg-background px-8 pt-16">
    <BackButton/>

<ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >



    <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
        {dayOfWeek}
    </Text>
    <Text className='text-white font-extrabold text-3xl'>
        {dayAndMonth}
    </Text>


        <ProgressBar progress={habitsProgress}/>
        <View className='mt-6'>
          {  
          dayInfo?.possibleHabits &&
          dayInfo?.possibleHabits.map(habit=> ( 
            <CheckBox
            key={habit.id}
            title={habit.title}
            checked={completedHabits.includes(habit.id)}
            onPress={()=>handleToggleHabit(habit.id)}
            />
          ) )

        
        }

        </View>
    </ScrollView>

        </View>

    )




}