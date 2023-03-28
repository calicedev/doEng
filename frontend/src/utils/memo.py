ex = "animate-[ppyong_0.33s_0.45s_both]"
li = []
for i in range(100):
    if i < 10:
        li.append(f"animate-[ppyong_0.33s_0.{i}s_both]")
        li.append(f"animate-[ppyong_0.33s_0.{i}5s_both]")
    else:
        li.append(f"animate-[ppyong_0.33s_{i//10}.{i%10}s_both]")
        li.append(f"animate-[ppyong_0.33s_{i//10}.{i%10}5s_both]")


with open("./frontend/src/utils/listMaking.txt", "w", encoding="utf-8") as file:
    for i in li:
        print(f'"{i}"', end=", \n")
        file.write(i)
        file.write(",")
        file.write("\n")












