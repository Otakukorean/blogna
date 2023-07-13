"use client";
import { useSession } from "next-auth/react";
import Coment from '../Comments/Comment'
import CommentForm from '../Comments/CommentForm'
import React  ,{Dispatch, SetStateAction, useState} from 'react'
import { Center , Flex ,Group,Text,TypographyStylesProvider } from '@mantine/core'
import UserCard from '../UserCard/UserCard';
interface PageParams {
     postId : string;
     Post : {
          id : string ,
          title : string ,
          content : string ,
          image : string ,
          userId : string ,
          user : {
               id : string ,
               name : string ,
               image ?: string | null ,
               roll : string  ,
               followers : {}[],
               following : {}[],
               Post : {}[]
          } ,
          Comment : {
               id : string ,
               postId : string ,
               parent_id : string ,
               createdAt : string ,
               userId : string,
               message : string
          }[] ,
          likes : {
               id : string ,
               userId : string ,
               postId : string ,
               user : {
                    name : string ,
                    image : string 
                 } 
          }[]
     } ,
     activecomment : string | null,
     setActiveComment : Dispatch<SetStateAction<string | null>>

}








const PostPage : React.FC<PageParams> = ( {
     postId ,Post,activecomment,setActiveComment
}) => {
     const {data : user  } = useSession()

    

     // const [data,setData] = useState('<p>غَرف بيديهِ في المَاء فشَرِب حتَّىٰ أرتوى، ثمَّ شَهقَ شَهقة فجرى الدّمعُ كفيّ السِّقاء، شُقَّ عَليهِ فتفرّسَ وتورّع، وقَام مُحارِبًا مُجْاهِدًا، ليحمي حِماهُ ويَصونُ حُرماتهِ ويَحفظُ عِرضه، حَريصٌ على قَومهِ رَءوفٌ بِهم مُشفق على حَالِهم؛ وحَالُهم من حَالهِ حَال بئيس، يُوجِز في الخِطاب ويُخفف النَّبر ويَدعو للنَّفير في سَبيل الحقِّ، دَرْءُ فَارِسٌ مُلثّمٌ بلثامٍ أخضر، لا يَعرِفهُ مُناصِروهُ ولا أعداءهُ، يُعرف بَهامتهِ المُهيبة، يُقال لهُ«ذو الأوشحة»لكَثرة الأقمشة على بَدنهِ،</p><p></p><p></p><figure><img src="https://pm1.aminoapps.com/8645/98eacb1a13c49184d58eb0bef890dba7edbf6a39r1-736-414v2_hq.jpg" /></figure><p>يَصلُ قَبل الفُرسان ويُغادرُ بَعدهم، إن بَدى لهُ بعض ما قد نَالهُ من الغنائم، تَركهُ للقَومِ يهنئونَ بهِ ويتولّى مُعرضًا يُناطِح كاللِّيث بَاحِثًا عن مُكر فَارٍ يسعى يأسًا خَائِبًا هوّة لينزَلِقَ فيها يتوارى عن أَعيُنه،</p><p></p><p>إن جَاءهُ فلان يَرّدهُ ولا يَنبس بَشفتيهِ، يَربطُ العِقال ويَمتَطي الجياد بعز وأنفة، في يَومٍ حَمي الوَطيس وتتابع قَوم نَبهان وعلى رأسهم ذو الأوشحة يتسابقون في سلِّ الرؤوس، فجاء العَدو جيئة الجَبان الغدّار من الخَلف وطعنَ من الرجال الفرسانِ، وهم أجود فرسان الجَيش، لا يُقتلون إلا بغتة لنضوجِ أجسادهم وقوّة بأسهم، فأصبحت القلوب لدى الحَناجر، وتراجع بَنو نَبهان خِيفة وتمكّن منهم بنو الأصفَر، فتسعّر الغَضب درء، قال من بَعيد بصَوتٍ عالي يَخرِقُ الأذان، يُلوّح بكلتا يديه من على خيلهِ: والآن يُعرف الرِّجل! أفإن ماتتِ الرؤوس أنقلبتم، بدلتم عزكم صغارًا؟! إن كانوا فيكم من الأعيان فهم فيكم من الأشهاد، يَرون تَخاذلُكم وذلكم، أتتراجعون لِمن يأخذ ما بينَ أيديكم ظلمًا وعدوانًا، يَجورون عليكم، وهم من المُعتَدين، وواللّٰـه إن أخذ الأخ فيكم من أخيه ما ليس له فيه من شيء لهَاج عليه هياج الكَلب ولأخذ منه ضربًا، ولأبى عِنادًا وجحدًا ليأخُذن ما أُخذ بالقوّة إما المَوت! هؤلاء ليسوا منّا ولا نَحن منهم، فمن هو أولى بالضّرب والطعان ؟.</p><p></p><p></p><figure><img src="https://pm1.aminoapps.com/8645/70dd33190dc3bf1ec89cfce5ede0445b1600b7ddr1-720-454v2_hq.jpg" /></figure><p>من الرِجال من سُمع صَهيلهُ قبل صهيل حِصانهِ، ومنهم من سُمع حصانهُ قبلهُ، ومنهم من سُمع صَوت رجف حَوافرهِ، فسمِعت ضحكة درء والمَعركةُ قائمة، قال: ءألآن وقد ظَهر الرِجال، وتَراجعتِ النّساء للخيم!. فسُمع نَفير القَوم أجمع نُكرانـًا لِما قاله، تثبيتًا وتصدية، في صَوت رجل واحد : قوم العز والكِبرياء لا تَخرج نِساءهم للحَرب، عن أي نساء تتحدّث؟.</p><p></p><p>فرفعوا الرؤوس مُحلقينَ بها وأستلّوا السيوف وقطّعوا الأوصال إن أشتدّ الألم، تنتشل منهم المنيّة فكيبرون ويفرحون، وتنتشل من بني الأصفر فيبكون وينحِبون، أنتَصر بنو نَبهان وخَسِر بنو الأصفَر، فجَمعوا الغنائم وذَبحوا وطَبخ النّساء أطايب الطّعام، فَرِحوا بالنّصر وتغيّظ بني الأصفر، ففرّوا مُدبرين إلا واحدًا منهم باغت ذو الأوشِحة بالرّماح فألتفتَ نَحوهُ يُسابِق الرّيح، يَطيرُ لِثامه عنهُ وأطرافُ أوشحتهِ من على فَرسهِ فتداركهُ بحصانهِ، نَزل من مَقام مطيّهِ بعَدما أوقعهُ ووضع قدمهُ عليه، قال سَاخِرًا: أوّاه، كُتبت عليكم الذّلة بالفِرار والهَوان..</p><p></p><p></p><figure><img src="https://pm1.aminoapps.com/8645/c4481c63a931a22cb6de78f3db7d42e564b8fcc1r1-735-380v2_hq.jpg" /></figure><p>فإذ بمن خَلفهُ يوقِعهُ ويكبّله عدد من المُرتزقة الجُبناء، قال كَبيرهم: آه يا درء، أنتَ في عِداد الهلكى، مَاذا تَقول؟. أشاحَ عنهُ بوجههِ يَضحك، قال: عُيّتم بالجُبن، نِعم القَوم، عدد من المُرتزقة على رَجل واحد! عَجزت أن تمسكني فكلّفتهم بالإطاحة بي من ظَهري، وجدت لكَ ثغرًا، لكن هيهات، الأبي يَموت أبيًا. فضَحك نُعمان وفيه وجهه العَجب : ألا يَكفُ لِسانُكَ أو تَنكسر وأنتَ في حِجر عدوّك! أكشفوا عن وجهه.</p><p>نَزعوا عنهُ حِجابهُ فإذا بهِ عَجوز غَلب البياضُ على سَواد شَعرهِ، يُعرف في شتّى البِقاع بأنهُ طَبيب يَصنعُ الدواء ويَبيعهُ للنّاس، يَعيشُ في شَقاء الفَقر ويقتات بالعَمل في الحقول، وقفوا في دهشة منهُ، يتسائلونَ عنه: كهل تنتَكس أضلعهُ ويضعف بَدنه، وهو من بنينا!. تقدّم نُعمان يشدّه إليه وعِرق الغَضب يدر وجهه: أتتحَالف مع العَدوّ علينا؟!!. فتوسّعت مُقلهُ يَنظر إليهِ، قال: لكلٍ غَضبة، وهذه غَضبتي على البَاطل، وهي أتّباع الحق وسلُّ الباطِل سلًّا، وما خِبت ولا خَاب مسعاي، خسئت وقَومك إلا الشُرقاء منهم، ونُصر الأُباة..</p><p>فغضِب نُعمان وأخذ الفأس من جَنبهِ وقطع رأسهُ. بعدها عُرف نُعمان بين القَوم بفقيد العَقل، يَروح جيئةً وذهابًا وقد بلغ من العُمر عتيًا يردد: فاز درءٌ وقد قُتل، وخَسرت أنا وأُرزق! طوبى لمن أفنى حياتهُ للحق، وتبًا لمن صَرفها للباطل معرضًا عنه..</p><p></p><p>كونوا ربانيين كـ دَرْء </p>')
  return (
    <div>
    <Center   style={{borderRadius:"10px",overflow:'hidden'}} m={30}  >
     <Flex direction={'column'} justify={'center'} align={'center'} >
          <UserCard user={Post.user} queryKey="detail-post" isProfilePage={false} />
          <Group mb={30} bg={'#150050'} style={{borderRadius:"10px",display:"flex",flexDirection:"column",justifyContent:"center" ,alignItems:"center"}} p={20}  >
          <Text size={'1.7em'} color='#fff' p={'4px'} bg={'#FB2576'} style={{borderRadius:"10px"}}>{Post.title}</Text>
          
          <TypographyStylesProvider  >
               <div style={{color:"#fff",textAlign:"center",fontSize:"14px",overflow:"hidden",maxWidth:"800px", lineHeight:"2.5rem"}} dangerouslySetInnerHTML={{__html : Post.content}}/>
          </TypographyStylesProvider>
          <Text mb={20} size={'1.7em'} color='#fff' p={'4px'} bg={'#FB2576'} style={{borderRadius:"10px"}}>التعليقات</Text>
          <CommentForm submitLabel="تعليق" hasCancelButton={false} setActiveComment={setActiveComment} activeComment={activecomment} postid={postId}  />

          {Post?.Comment.filter((com : any) => com.parent_id === null).map((comment :any) => (
     
     <Coment postId={postId} comment={comment} currentUserId={user?.user?.id} replies={Post?.Comment.filter((reply : any) => reply.parent_id === comment.id)} data={Post} activeComment={activecomment} setActiveComment={setActiveComment} />
 
          ))}
          </Group>


 </Flex>

    
     
    </Center>
    </div>
  )
}

export default PostPage
