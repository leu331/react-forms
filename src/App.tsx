import "./App.css"

import {Controller, useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"

type FormData = {
  name: string,
  date: string,
  choice: string,
  description: string,

  student: string,
  birthDate: string,
  motherName: string,
  fatherName: string,
  year: string,
  address: string
}


const schema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  date: yup.string().required("A data é obrigatória."),
  choice: yup.string().required("O tema é obrogatório"),
  description: yup.string().required("A descrição é obrigatória").min(5, "A descrição precisa ter pelo menos 10 digitos"),

  student: yup.string().required("O nome do aluno é obrigatório"),
  birthDate: yup.string().required("A date de nascimento é obrigatória"),
  motherName: yup.string().required("O nome da mãe é obrigatório"),
  fatherName: yup.string().required("O nome do pai é obrigatório"),
  year: yup.string().required("Selecione o ano"),
  address: yup.string().required("Insira as informações solicitadas")
})

export default function App() {
 const {control, handleSubmit, formState:{errors}} = useForm<FormData>({ defaultValues: {
  name: "",
  date: "",// isso só serve para ter os valores padrao, o que define o nome do campo é o de cima
  choice: "",
  description: "",

  student: "",
  birthDate:"",
  motherName:"",
  fatherName: "",
  address:""
 },
 resolver: yupResolver(schema)
}) //vai receber os dados que vem do form

 function onSubmit(data: FormData){
  console.log(data);
  
 }

  return (
    <div id="grid">
      <div>
        <h1>Evento </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
          control={control} // vai enviar os dados diretamente para o control 
          name="name" //name é a forma de identificar cada um dos inputs
          render={({field}) => <input type="text"  placeholder="Nome do evento" {...field}/>}
          />  
          {errors.name?.message && <span className="error">Nome é obrigatório</span> }
          
          <Controller
          control={control}
          name= "date"
          render={({field}) => <input type="date" placeholder="Nome do evento" lang="pt-BR" {...field}/>}
          />
          
          <Controller
          control={control}
          name="choice"
          render={({field}) => <select {...field}> {/* o que eu colocar nesse default values é o que vai aparecer como opção de escolha padrão nas options*/}
          <option value="" disabled>
            Selecione...
          </option>

          <option value="react">React</option>
          <option value="nodejs">Node.js</option>
          <option value="javascript">Javascript</option>
          <option value="typescript">Typescript</option>
        </select>}
        />
        {errors.choice?.message && <span className="error">Selecione uma opção</span> }

        <Controller
        control={control}
        name="description"
        render={({field}) =>  <textarea placeholder="Descrição" rows={4} {...field}/>}
        />
        
        <button type="submit">Salvar</button>
        </form>
      </div>

      <div>
        <h2> Inscrição </h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Controller
          control={control}
          name="student"
          render={({field}) => <input type="text" placeholder="Nome do aluno" {...field}/>}
          />
          
          {errors.student?.message && <span className="error">Nome é obrigatório </span>}

          <Controller
          control={control}
          name="birthDate"
          render={({field}) => <input type="date" placeholder="Data de nascimento" {...field}/>}
          />
          {errors.birthDate?.message && <span className="error">Insira a data de nascimento </span>}

          <Controller
          control={control}
          name="motherName"
          render={({field})=>  <input type="text" placeholder="Nome da mãe"{...field}/>}
          />
          {errors.motherName?.message && <span className="error">Nome da mãe é obrogatório </span>}
         

          <Controller
          control={control}
          name="fatherName"
          render={({field}) => <input type="text" placeholder="Nome do pai" {...field}/>}
          />
          {errors.fatherName?.message && <span className="error">Informe o nome do pai </span>}
          
          

          <Controller
          control={control}
          name="year"
          render={({field}) => 
          <select {...field}>
            <option value="">Informe o ano do curso</option>
            <option value="fifth">Quinto ano</option>
            <option value="sixth">Sexto ano</option>
            <option value="seventh">Sétimo ano</option>
            <option value="eighth">Oitavo ano</option>
            <option value="ninth">Nono ano</option>
          </select>}
          />
          {errors.year?.message && <span className="error">Informe o ano a ser cursado </span>}
          

          <Controller
          control={control}
          name="address"
          render={({field}) => <textarea placeholder="Cidade, CEP, Rua e Bairro onde residem" rows={4} {...field}></textarea> }
          />
          {errors.address?.message && <span className="error">Preencha as informações solicitadas</span>}
          
          <button type="submit">Enviar</button>
        </form>
      </div>

    </div>
  )
}
