import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Modal,
} from 'react-native';
import {
  Menu,
  Bell,
  Search,
  Filter,
  Grid3X3,
  ChevronRight,
  ArrowLeft,
  Clock,
  Home,
  Pill,
  Stethoscope,
  BookOpen,
  User,
} from 'lucide-react-native';
import { router } from 'expo-router';

interface Animal {
  id: string;
  animalId: string;
  species: string;
  age: string;
  lastTreatment: string;
  image: string;
  statusColor: 'green' | 'orange' | 'red';
}

const DUMMY_ANIMALS: Animal[] = [
  {
    id: '1',
    animalId: 'A-123',
    species: 'Sheep',
    age: '2 years',
    lastTreatment: '2023-10-26',
    image:
      'https://static.wikia.nocookie.net/animals/images/b/ba/Sheep.jpg/revision/latest/scale-to-width-down/1200?cb=20190209033122',
    statusColor: 'green',
  },
  {
    id: '2',
    animalId: 'A-124',
    species: 'Goat',
    age: '1.5 years',
    lastTreatment: '2023-10-20',
    image:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMVFRUVFRYVFRcVFRUVFRgYGBUXFhUVFRUYHSggGBolGxUVITEhJSkrLi4uGB8zODMsNygtLisBCgoKDg0OGhAQGyslHx4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0rLS0rLf/AABEIALkBEAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwEEBQYAB//EAEUQAAEDAgQDBQUECAQEBwAAAAEAAhEDIQQSMUEFUWETInGBkQYyobHBQrLR8DNSYnKCwuHxFCNzkkOzw9IHFRY0U4Oi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKREAAgICAgIBAwMFAAAAAAAAAAECEQMSITEEQVEUInETMtEzQmGBkf/aAAwDAQACEQMRAD8AcAjDVYDAoXg2BDGKcimUbQltQwMi81ibCJrUt2BAavZU1oRhqewCIU5E8MUlsQDqRIEiY5wnyOmIDEQpqwaJGrT6FQ1JtrsBQpqcqdCnKmmBWcvKx2a92SYFUsQ9mrnZoTTSArQoyqz2a92SAK+RE0J2VCWp2NCqiSGKyaa8KaOBiYXoTDTQFhSpAAWJL6CcWlecE6HwK7MIeyTcpQOalRLonIEiqwI3ylSihWLhKeU17UmoLK0gbRfY5GhYF4qNSRiIPQByOkE9LKSJzKQ9DUKKmEfphQwFOp0y6wm5A9TEDqopMkgDUrV4HWDqwpjvNYQ7NED7Wk6mfQjmtcWG5KzTHH2/Qyn7Mw8OfLm2JAMSbm4nqBPT14r2np1HYgtpMcDIGQTFtze21wSvrlV8BfOaHFw0VsS8Dv1MjQAA4R3Wt1MkmbA6xZehmShFUb4Jyk22Iw3EMTQY1hiXENpgmCCQSWd42BgxPIjkEVbj1RpmvhX5f/kpljiLm7st7CLmyw8djDiAz/LqBzqrbOblEDM8EC0EZB6+C7CnUbUbMQ8a7T1jmuec5JU+Qy40/uihVCo17BUpuD2HRw26EbKSq1TBEONSi7s3nUxmY/8A1Kdp8QQdLoaeMfMVaJb+3SPa0/GID2+EGOa5XCMuY/8ADlq+i0CjzKYXgFkIgFeJRFAXJAelTKDMvFyQHigIUgqUCBaVJKlCUARmQlylwXg1NAKJXlLkDinYBFyS9yJJqOS7CyHFITZQlUkKyEl7U4JT00BYLkQBKU0p9MhMZApowEUqU7oDwYmsYgCIOQpDsc0hsS6HVGvyc4blDnergrH/AIdMgFp/4bAPDtIqQetrqvxHBDtWvmQ1nZt6AHMXTzLjfmA3krODxTqNMlgvVqGXQSAKbG6xuQ4+MRqQuzC7ypel/B1uOuH/ACzpeNYnJRqPabtaYi94tAgyvlHB8QWAurAgglwa4gCSTLgJ1AgX0C6nC4yrXpVTUY5gce6HWzACQ+ASAPdjexXz/i9aS5lWpdpOh1Ib3R8/VX5Etpar0aeJBKLv2dbhXmqW1YOXLLZ5uMGBPID1C2GYTsy0mSXTO8QQQCfX4+eZSw5DWMacoYxrW370hoHlELQZiXR2b3BxkEuI70AQZy20JNo2sZXPjcad9+i8qncdevYyqCCRyMLzQsXF8Y7PEOpm4aGgjxZIynYgR0W3h6rXiWEHw18xqFlLG0cOTFKP4PEICSmqMqyoyF5kJTSxCWoYgAEeVQvZktQPZUL0QKgtJ0BPgJQkMAKYVqngKp0pv/2kfNWW8Drn7IHTM38VosU30mBlgIwFqt9nq37H+4/gi/8ATlX9an6u/wC1V9Nk+AMRzUrKtjEez9YaBrvB30MLMr0XMMOBB6qJ4px7QCHBIqBNeChyJJAIheLUwtQvFkUFC4SXtRPJQiU0hDEbENMphcq1ZWrGNKkOSAU5hSoEhocvZUsBG0lNcDLdXHGoAQzIBpmu7xgGPiVW4xxMUsJDhLQ8gw7K4ZgYeCQZOa3mExgU1qbXNLXAOa4Q4ESCDqCFcM+krLeRyqzjGe1VV0s/xApiIBLQ+p0JM5R6bFc9w3Eiti6La1SWZxne4gZmtEgOP7RER+0vomH9m8I3Sgw3nvAv+8TyXIe3Hs9TohrqNMtFQG8y2xu0A6EfIhbwyxyXRvDJbpHc1sbTA/SUyDq7M0Dx16qlU49hqQJ7Vj3CTlY4OcSNLCzd7m3yXySpw8ZRA06blW8DQLQI8TygbJrDFLs32k30bGNxj3VH1nWc5xNrxIgNb0AELoOEY6WAaEXgG4315T+C5PEVz3BzufMn+votzBsLXNpN1cWveR+rNhHgfRXIuJ9s4AztMPTdVa1zo1c0ExtMjWFfPD6R1ps/2hRw8AU2AfqjptyVhdiiq5PJk7bM9/BaJ+xHg5w+qU72fpc3jzH4LUleBUPDjf8AahGG/wBm2bVHDxAP4Iqfs2z7T3HwAH4raKkJfT4/gChR4NRboyf3iSrtOm1ohoAHICAjULRRUekB5RKkqFQESplC5eCAPEJGKwzagyvEj86HZNchKVXwwOS4twg0jLZcw77jofxWf/hXRIa6OcGF3cojVXLLwot2nQWfOKogpT13mLoUn++xp66H1F1zvFOEBneYZby3HnusZeFKPKdisxA1eNNFKkVAs1BIR51IDRQKQKYCihZSzWauYttIBGWhCQppSVlsydmHTanhgShKcKZKm2x7HiAhheNIomUSgLICr8aoCphntInI5tQdBIa//wDJJ8leZQTG0BoRIIIcOYIIcPQlXjesrHGVSTPlHEMK0WGxn4GPoq7qfutESbzraSIPkPmtnieEyugm7HFjv4bSs6thz4k9Nj/S67IyPXq0UgQXZiBz0tAFp2K6D2Oouc81HgmYJ6CxEWsICoYTCzm6CPU6/Ndl7OYYMpbSTf8AhsnKaQtT6tRiBFxFkcrO4C4mi0k5veg9A4gfJaC74u0meRJU2jylq9ChqokMLygLyAJleUL0oAkoSvKCUAQUMrxKXmQAxzktyU6ooY+U6FZNR0JJqr2JqQFWElUhNlHiOLLXgAxIRUXEgh151WTxOXVHHYWHlr8ZVjAYg6O1Gh5jksY5fuaYjKxWFyvcOqWKCv8AERmdM7QevJVMpXNLGlJiHDCkpjsIrVN0JoXPHxUdbxozRhoT6NBXLJ9BoT+ljYaIqCiAia0aJ9SmCvHBmJCtePFAooEUQi7MJRa5eDXKv0o/A9UOZTCnslWMhHTcU1CPwPU5b2x4UWv7YCWPgO/ZcBv0IE/7uQXP4HDZnOJ0jLtJO59AvpOLoCqx1J57rxlJ5HZ3kYK+a0qD6T306hh1MkEeFiR06rDNHXlHf409o6v0XsFhRqRAJ+VvxXSYanILf1YA6mATMabrApWAAuASB5kzb6Le4FRqPMxANUNkCReBMjTdYxbk6NMnCs7T2cJ/w7J5uje2d0X3Wq1Jo0QxoY2wAgJwC9iCqKR4s3cmzzkIKlyGVRIZQkqC5DmQAeZRKXmXsyAGShc9LLkJcgA3OSaj14uVatUTQmxVevG6dh6lll1nyQr2HdYKiUyazpsjXi0SvV9CgDm6wknxPzQZU5ygrma5OhLgqVWO2SHU3blXapIVWpXtf5JOKKRbe4bFWaVSQslhvCuUCuKHk36Kuy9kBUZy3RCxttbpD62UxqtXmSVsC3SJ3VpjzpKzm4y4kJ5xTVSzQ+RWWHlJFYykOrE+6mMd0Qsqk+ATQ4XRdkl5wE1tVaisU6gqXtJ7PivTFdo/zWhsxqQ2QT4x8loOervCaxlzfP8AH5hNwUlTGskoNSXo5PB+zlVwyRDjlcCZhu912/COGigwMF4/GfqrjCEyUYvHjj5XYsvkSycPoEleD0NQoHOstzANz0EpHaLwqj0BlOhDy5DmSnVV5tRKhjQhL0tzwlOrp0Kx5egL1WdWVetioToVlutXjdZtfFSbKrUxZcegShWE3TQmWwJWjg2WuqeGcCtXDC1kNgkG1ip8SqZWOPQq+9YvHqkNj9Y/1U3wWlboyyLIc0JURCdiqIaGjNJdssGzeiGvmSqWKIO6Y3D9UDqTdypZSSPYWp3tNVp0qrADe65l1SpMtVik1xuSvHjKcOkYLIzUr15SaViJkpDndQmse6BdCjKT5G8paFZmh1UEieiqnDyZVhq2UPkX6gWcjRPD3JJI2KYXAxCpRaE5DDWO4UMxQQujdCMuy0i3VjTLPaA3R0MQWOkFJbiB7tpQPHRaKTXRR1dOpIBG4n1TO1XPYLHuY2CJA0veOSuu4hMEEeBkFd0JqSM3wabXSUTmrPw2Nk3IkmOn91flWKxbqKx+KYjK6AdRf8+a2HuXNcTfNQxtb6piZcw1aRJPXqrYda/msanUdyEeKeKxdF26bHN8AixI0O0mAD5hQcvP4pdOha6TiKrKbcziGjYki/h/dFhR7E1BzWNiKrnEgaDXl4eKOn7UU3FzSwhgBIe4RJjYDTzWPVxz6pIpU3ZfgeZJ/OizlNFKJpYir3YZtqdBvPjssSqKrjZ5vuDYJb8PUeYfJ6aNFlsYHBwWt2kfDVJWx8Ijg+HxFLMajs0EBnenNTiYcD7rpJ3XacOq5mhw3XPvdJNwAtTgtWGQeZ/upxzUnwVKNKzUr1FgcSOcxstLGOLtNNz9AsriFQMaCeceon6LSbqLJi/uKVXDGJalvbIE6hNOMYRYlV6uKpixdK5tkb7IBpEkAyTshrUx9rXZNbiaQ724slnEscb3+ieyHuio1sfgm5CbaIWXubFeIk6riaSOYh9DYo2kzAXjUgGbwl0K4NwD6FNcAXKRI1KMsIPQqaVEn+qtuxBDMliBvF1pFJrkDPewzZWaVEDXVEACNV4NKagybDNPkoNMjopa4qXuJ0WihwFslsDbzViZCptJm4VhtSyFALDnZQZXgUDndVokkLYPMWnRdJQu0EaEAhcs+qecrqOGCaLP3QtIZNuBxCLVyvFaTRUeb6/QLrK1XKuRx9TNVfElpiZ5xf4pZ5uMbRRUp1HjSHDkQUDe1zS1+Q75Tt4EFNc8jklPrgfJcf1EmFoTXoVXyH4ioZ1AdA+FvgqTuGU22zPMcyDrrFreS1w4b/BKGHzGeSSySb7HYjDUBs1x/e/DROBLHi86SPooGIeXZGsdHPYJhwl5cCEO27Vg2aLMNB0TadK4KLDugN/dGpvpujqnfl8ua9NfJFnP1JaTOxI9DH0V3guLh5DnQDp0Kz6tduWSJ3SqTxmDm2AIMaaEQvLxR1lsinPijtmMDoOu8/h0VLjrB2Dp1zAjxkD6q/hKhewOtDhNlk8drA0ngaNyxF5749NF6Un9rEc3UqQIiNlUrOOtrp9erMCPigqMOg2+K8xzVh2VHVjvzQiubgbaqw7CixJ8uRPNLZRIkxzn6BG99C5L1StlGpPxXmYgnQSoD9DaCU8VGjT16oa2AfTMgd2/gmUzzsqFTiTpDQyw1Mp5xY3GgmddNU9GhlxobaXJkx1VOm8OvHU7Jortm4gytYpEtlhrwbAR4pjKo3t1VcVRKJ9WSIAVNgi054OiTTqxqIlIFaATtrYa+CWa87QeR5eCLAvmpeLc0AqAqrTeeYvuiIdPdvHvKdgotOPJVjVOYiLc0bHEgyRa2qdRptLgHktHMCUtm+h6lF+JI8Oq7fh9cZGt3DWg+gXGd2SI1PqV0HCcPMVQSM4BcP2m90x5gq8HDZcV8l7ihgGDcBczjHweenjoF0VamXOnaI87R8FgcYwpDuhBB8dPl8lt5CuH4JKtipouaPs5uhSjhjAF4+J80VJkQMo6C65FChDnVAbzfkAldqJSKlISXAkTre1vklh4M5Tv+bp6oGXTiI3v0SH19dTCQ14AGYeN7+ZXsQ52WWM10kxKJSS4QUzfwwllMndv9kHEa4ZTJJiRl9bLSGGgNH6oA+ELA9pn5Gt3l0xEmwP4rtm3GA6MZ1VpdaSIg2069ULKoG0k35wooZs3u92LG2uwA3Ka1mQiRE2AmSbSZ8JXmu+go7H2dvh23Orhy+0Vke01MtpjbvT5Cdeeq3OBMjDt6ifUkj4FYXta/wBwEB1nCDMRabLvn/S/0BgU2uJ93NbUHbaFZd3RlAHLN9rmRdUhinDWmdrCwAAQuxgfZzCNxf08NFwaUAwkSRJPhzn8EirjzMNZ3eZN5upcZOkTeB9Sl1aQ0M3NjOnPw8UKImy9TeBBuDuIsB5/mybRbD5LLE33m3KU1rZuS7Tp5kr1MENBAkTfn48lp10MKq1mY94gWiW2845IqWQCJJcftaCeg+qKnlgyHSNIIB6ZrdVMtmctzEXHlFt1dhwVqsAwCbj8+SXi6z+6A2LjXbxHJaT3tJiCJ3zNjwMjos/FYfPBzu70C5yx07oEpJpBSHCpJETMz0025hNp17HSemt0mngiHD/NdGkAZdJHj6p7MP70meZJtv8AUJb2+AoFlY2aL31vGmzhbdJOHe4mS0iYEa6Rr9VYbTcSGkw2/u5t4/DyTmU2CQzMTvL5PhEDqrfQ1RnVsBUa4ZXtkCDYm/jaYR1azhIEvJvYkb7ehVzMYbuAd4sBzn82THujYXIMT8lDaqw4KQqVAJLPqYlMLqj2ggEA65jl30BJ8bo88EENtNyYiCdgiZlbq0Nk3kgkCTlOulk8cfYJhU6YYIb3d/ez+ME6rqeBj/IbrfMb2PvOXKueDBBHrpyXZ4CjlpMadQ0T46n4krbD+5sLsTMVS3m0H0MH7zVR4uzuk8rjxCv9mDVLpEtaW9e8Qf5Vn8aoF9N7AblpAvF4tfa+66vyJnOHG2sd4iI+aR/5mLy4W30v19IVCq5zXQTcOO+hBEm45k/NZ2KpB7joSdTcAAnT6+a4HNXRNmweLMgXF406nRS/GADUdAIsPKyxi1oIgTG+xteTAm9/wT2VGiIgGO9pPiOe/RQ0itkaTcdTiTLt+83ugad2N1a4I7tK1NsOAzA3EWHeIvtAjzWUzGzIgCY31AtP1XbeyjWCk2s6DUfmBfM2DiIaToO6tMUISfHoakmbGLeGtLiYAEk+C4njvFGHI9jpa5ji0gWEEtiDfYBdfxF5LSGES4HqNNT0Xyv/AAuxIdGb3ZLRM5iJtzvGt7LozNONA3RoDGuucwDYkmBJA/JSa2MBu1+awkAyRIn4/RVRhqbhkaHRqNZIEWm35Oy3vZXAUu2bmA7jc4nVzgRDiJ8DC5o405UT2d5hqYbTa0WDWgX6ABc5xPBtxNQZbhkiQe6b9NbyulccwIG6nD4QN0C73FVTGYQ4AyNNdVXHs+MwOXS4Gy6zKvZFOkfgKOOxvBo0AkaLk+IgskO1nqPSNLQvrFWiCsLinCg5rtj0E/MhKWNNcCo5NmY2c9jTEkZ5IsYmBBEDSZBPRN7XKzTUiTc63gAbnmfqstv/ALhvg76ID/Oz7i4WXqaFPGyBAdM2LgQT+zpsAPD5XKZGt3Tp7oje0TIvqip6v/e+rkniH2vH6uRHlBqj3akded9dZTW1coiRBN728PCVVHvjy+i8fx+itIkuOJMOF+cHQ76kW5eSgl0m4AJk3AgTsRve0quNPVJqfo63gP5U9Uxj6Zax2UGSQ4xJlwk3BdNhJFtLaq45xyyQTpve+pHPf1VHAe9U/cp/9VaWN0/i/mCH2HQkVgN819jfQGwmTr80TaYNpzNj+ICN+RvyCB/unwP3HKtgNf4G/wDNck0vRIdbFtZYGIAFpgDq3bYefmjONbGg31aDNpvmBt/VVf8Ai+R+SpUNWeJ+81LoTbO19l8O2oTWdeDDZECdZyi0gH4zyXTl45rlPZT9Ef33/wAitcS+tP5rqxftRSFcX403D1zIJ7RggAbtL9T1n4dQufw/tRUdUyupxlPeOovYAc7nXw5qr7Ue+3/THzqJWG/Su/P2GrHLllGVIVkS8kuyC5Dy57A4i8iOXzvyWc/h1VwzB3eLjmcGiLGAAIESfSy1Gfo//rp/fYrD/dd++fvNXLLIxro593CXOHvnXUgxpeBMgd1vqU5nDGtc0l0mIAm5gnaLX26m61Ptj+L76n7TfFv3QmptoBdLAMAdBNidTbUe6ALG2h6oml+VrQ50NPdBsQ46iTz15GU8e8PGp82pTP0bPL+VXBVygixeHNam+oe0BBBabmCItANhfx35pdKmMuUsIi+maYG4G2/LTaE2n7/8bfuBRV1P+q75FPZy7BsNzAdJJnKGk6EyItysIPLqF1XAOChveddxuT9PBc/gf0zPF3yC7/A6Lo8dJ8iH06QCMhEoK6CwCvSvOQoAkpFZspyVUTQmf//Z',
    statusColor: 'orange',
  },
  {
    id: '3',
    animalId: 'A-125',
    species: 'Cow',
    age: '3 years',
    lastTreatment: '2023-11-01',
    image:
      'https://media.istockphoto.com/id/496397741/photo/typical-dutch-red-and-white-milk-cow.jpg?s=612x612&w=0&k=20&c=juTog_zRhJIQa0sOUcwk5WH1AM3PRxhlvsIm4dywzK8=',
    statusColor: 'green',
  },
  {
    id: '4',
    animalId: 'A-126',
    species: 'Sheep',
    age: '4 years',
    lastTreatment: '2023-10-15',
    image:
      'https://static.wikia.nocookie.net/animals/images/b/ba/Sheep.jpg/revision/latest/scale-to-width-down/1200?cb=20190209033122',
    statusColor: 'orange',
  },
];

export default function AnimalsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    'Weekly' | 'Monthly' | 'Yearly'
  >('Weekly');

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Opening menu');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'Opening notifications');
  };

  const handleFilterPress = () => {
    Alert.alert('Filter', 'Opening filter options');
  };

  const handleGridViewPress = () => {
    Alert.alert('Grid View', 'Switching to grid view');
  };

  const handleAnimalPress = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAnimal(null);
  };

  const handleTreatmentPress = (treatment: string) => {
    Alert.alert('Treatment Details', `Opening details for ${treatment}`);
  };

  const handleViewDetails = (section: string) => {
    Alert.alert('View Details', `Opening ${section} details`);
  };

  const handleBottomNavigation = (tab: string) => {
    if (tab === 'Home') {
      try {
        router.replace('/farmer-dashboard');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else if (tab === 'Medicine') {
      try {
        router.push('/medicine');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else if (tab === 'Animal') {
      // Already on animals screen
    } else if (tab === 'Learn') {
      try {
        router.push('/learn');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    } else if (tab === 'User') {
      try {
        router.push('/user-profile');
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const getStatusColor = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return '#22c55e';
      case 'orange':
        return '#f59e0b';
      case 'red':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const renderAMUChart = () => {
    const chartData = [
      { day: 'Mon', value: 15 },
      { day: 'Tue', value: 25 },
      { day: 'Wed', value: 18 },
      { day: 'Thu', value: 8 },
      { day: 'Fri', value: 12 },
      { day: 'Sat', value: 5 },
      { day: 'Sun', value: 20 },
    ];

    const maxValue = Math.max(...chartData.map((d) => d.value));

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartArea}>
          <View style={styles.yAxisContainer}>
            <Text style={styles.yAxisLabel}>30</Text>
            <Text style={styles.yAxisLabel}>20</Text>
            <Text style={styles.yAxisLabel}>10</Text>
            <Text style={styles.yAxisLabel}>0</Text>
          </View>
          <View style={styles.chartContent}>
            <View style={styles.chartLine}>
              {chartData.map((data, index) => {
                const x = (index / (chartData.length - 1)) * 200;
                const y = 80 - (data.value / maxValue) * 60;

                return (
                  <View
                    key={index}
                    style={[styles.chartPoint, { left: x, top: y }]}
                  />
                );
              })}
            </View>
            <View style={styles.xAxisLabels}>
              {chartData.map((data, index) => (
                <Text key={index} style={styles.xAxisLabel}>
                  {data.day}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderAnimalItem = (animal: Animal) => (
    <TouchableOpacity
      key={animal.id}
      style={styles.animalItem}
      onPress={() => handleAnimalPress(animal)}
    >
      <View style={styles.animalImageContainer}>
        <Image
          source={{ uri: animal.image }}
          style={styles.animalImage}
          resizeMode="cover"
        />
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor(animal.statusColor) },
          ]}
        />
      </View>

      <View style={styles.animalContent}>
        <Text style={styles.animalId}>Animal ID: {animal.animalId}</Text>
        <Text style={styles.animalSpecies}>Species: {animal.species}</Text>
        <Text style={styles.animalAge}>Age: {animal.age}</Text>
        <Text style={styles.animalTreatment}>
          Last Treatment: {animal.lastTreatment}
        </Text>
      </View>

      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animals</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Bell size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Search and Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Animal ID"
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={handleFilterPress}
          >
            <Filter size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={handleGridViewPress}
          >
            <Grid3X3 size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Animals List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.animalsList}
        >
          {DUMMY_ANIMALS.map(renderAnimalItem)}
        </ScrollView>
      </View>

      {/* Animal Detail Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={handleCloseModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleCloseModal}>
              <ArrowLeft size={24} color="#374151" />
            </TouchableOpacity>
            <View style={styles.timeContainer}>
              <Clock size={16} color="#ef4444" />
              <Text style={styles.timeText}>10:32</Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.modalContent}
          >
            {selectedAnimal && (
              <>
                {/* Animal Info */}
                <View style={styles.animalInfoSection}>
                  <Image
                    source={{ uri: selectedAnimal.image }}
                    style={styles.modalAnimalImage}
                    resizeMode="cover"
                  />
                  <View style={styles.animalInfoText}>
                    <Text style={styles.modalAnimalId}>ID: 12345</Text>
                    <Text style={styles.modalAnimalSpecies}>Species: Cow</Text>
                    <Text style={styles.modalAnimalGender}>Gender: Female</Text>
                    <Text style={styles.modalAnimalAge}>Age: 3 years</Text>
                  </View>
                </View>

                {/* Today's Treatments */}
                <View style={styles.treatmentSection}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's Treatments</Text>
                    <TouchableOpacity
                      onPress={() => handleViewDetails("Today's Treatments")}
                    >
                      <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.treatmentItem}
                    onPress={() => handleTreatmentPress('Antibiotic Course')}
                  >
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>
                        Antibiotic Course
                      </Text>
                      <Text style={styles.treatmentDetails}>Day 3 of 7</Text>
                      <TouchableOpacity
                        onPress={() => handleViewDetails('Antibiotic Course')}
                      >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.treatmentStatus}>
                      <View style={styles.statusCircle} />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.treatmentItem}
                    onPress={() => handleTreatmentPress('Pain Medication')}
                  >
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>Pain Medication</Text>
                      <Text style={styles.treatmentDetails}>Twice a day</Text>
                      <TouchableOpacity
                        onPress={() => handleViewDetails('Pain Medication')}
                      >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.treatmentStatus}>
                      <View style={styles.statusCircle} />
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Upcoming Treatments */}
                <View style={styles.treatmentSection}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Upcoming Treatments</Text>
                    <TouchableOpacity
                      onPress={() => handleViewDetails('Upcoming Treatments')}
                    >
                      <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.treatmentItem}
                    onPress={() => handleTreatmentPress('Follow-up check')}
                  >
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>Follow-up check</Text>
                      <Text style={styles.treatmentDetails}>
                        Tomorrow, 10:00 AM
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleViewDetails('Follow-up check')}
                      >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.treatmentItem}
                    onPress={() =>
                      handleTreatmentPress('Antibiotic Course - Final dose')
                    }
                  >
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>
                        Antibiotic Course - Final dose
                      </Text>
                      <Text style={styles.treatmentDetails}>In 4 days</Text>
                      <TouchableOpacity
                        onPress={() =>
                          handleViewDetails('Antibiotic Course - Final dose')
                        }
                      >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Past Treatments */}
                <View style={styles.treatmentSection}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Past Treatments</Text>
                    <TouchableOpacity
                      onPress={() => handleViewDetails('Past Treatments')}
                    >
                      <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.treatmentItem}
                    onPress={() => handleTreatmentPress('Vaccination - FMD')}
                  >
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>
                        Vaccination - FMD
                      </Text>
                      <Text style={styles.treatmentDetails}>
                        Date: 2023-01-15
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleViewDetails('Vaccination - FMD')}
                      >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.treatmentItem}
                    onPress={() => handleTreatmentPress('Deworming')}
                  >
                    <View style={styles.treatmentInfo}>
                      <Text style={styles.treatmentName}>Deworming</Text>
                      <Text style={styles.treatmentDetails}>
                        Date: 2022-11-20
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleViewDetails('Deworming')}
                      >
                        <Text style={styles.viewDetailsText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* AMU Trends */}
                <View style={styles.chartSection}>
                  <Text style={styles.sectionTitle}>AMU Trends</Text>
                  <View style={styles.periodSelector}>
                    {(['Weekly', 'Monthly', 'Yearly'] as const).map(
                      (period) => (
                        <TouchableOpacity
                          key={period}
                          style={[
                            styles.periodButton,
                            selectedPeriod === period &&
                              styles.periodButtonActive,
                          ]}
                          onPress={() => setSelectedPeriod(period)}
                        >
                          <Text
                            style={[
                              styles.periodButtonText,
                              selectedPeriod === period &&
                                styles.periodButtonTextActive,
                            ]}
                          >
                            {period}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                  {renderAMUChart()}
                </View>
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Home')}
        >
          <Home size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Medicine')}
        >
          <Pill size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Medicine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomNavItem, styles.bottomNavItemActive]}
          onPress={() => handleBottomNavigation('Animal')}
        >
          <Stethoscope size={20} color="#22c55e" />
          <Text style={[styles.bottomNavText, styles.bottomNavTextActive]}>
            Animal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('Learn')}
        >
          <BookOpen size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => handleBottomNavigation('User')}
        >
          <User size={20} color="#6b7280" />
          <Text style={styles.bottomNavText}>User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    paddingVertical: 10,
  },
  filterButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  gridButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  animalsList: {
    flex: 1,
    marginBottom: 90, // Adjusted to leave space for bottom nav
  },
  animalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  animalImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  animalImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  statusIndicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  animalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  animalId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  animalSpecies: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  animalAge: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  animalTreatment: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  bottomNavText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  bottomNavItemActive: {},
  bottomNavTextActive: {
    color: '#22c55e',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  animalInfoSection: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  modalAnimalImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  animalInfoText: {
    flex: 1,
  },
  modalAnimalId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  modalAnimalSpecies: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  modalAnimalGender: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  modalAnimalAge: {
    fontSize: 14,
    color: '#6b7280',
  },
  treatmentSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  seeAllText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  treatmentInfo: {
    flex: 1,
  },
  treatmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  treatmentDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  viewDetailsText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  treatmentStatus: {
    marginLeft: 12,
  },
  statusCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    backgroundColor: 'white',
  },
  chartSection: {
    marginBottom: 100,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 2,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  periodButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 4,
  },
  periodButtonActive: {
    backgroundColor: '#22c55e',
  },
  periodButtonText: {
    fontSize: 12,
    color: '#6b7280',
  },
  periodButtonTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  chartArea: {
    flexDirection: 'row',
    height: 120,
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    paddingRight: 10,
    height: 80,
    paddingTop: 10,
  },
  yAxisLabel: {
    fontSize: 10,
    color: '#9ca3af',
  },
  chartContent: {
    flex: 1,
  },
  chartLine: {
    height: 80,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    position: 'relative',
    marginBottom: 16,
    marginTop: 10,
  },
  chartPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
});
