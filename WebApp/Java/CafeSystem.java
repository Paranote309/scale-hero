public class CafeSystem {
    public static void main(String[] args) {
        Menu menu = new Menu("stock.txt");//object class using menu method
        //display menu method works if exit not equal true
        while(Menu.exit != true){
            menu.displayMenu();
        }
    }
}

